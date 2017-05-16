/*
 *  RPPLoader.jsx v0.0.0 / ScriptUI
 *
 *  Author: Kareobana(http://atarabi.com/)
 *  License: MIT
 *  Dependencies:
 *    Kikaku.jsx
 */

(function (global) {

  //Lib
  const { Utils, JSON, UIBuilder } = KIKAKU;

  //Constants
  const SCRIPT_NAME = 'RPPLoader';

  const AE_VERSION = parseFloat(app.version);

  const DEBUG = false;

  //Utility
  function getFileByPath(path: string, base_uri: string): File {
    let file = new File(path);
    if (!file.exists) {
      let relative_file = new File(base_uri);
      relative_file.changePath(path);
      if (relative_file.exists) {
        file = relative_file;
      }
    }
    return file;
  }

  //RPP
  const RPP_HEADER = '<REAPER_PROJECT';

  enum RPPType {
    NONE = -1,
    SECTION_START,
    PROPERTY,
    DATA,
    SECTION_END,
  }

  const RPPParser = (line: string): { type: RPPType; name?: string; values?: any[]; } => {
    line = Utils.trim(line);
    if (!line.length) {
      return { type: RPPType.NONE };
    }

    let type = RPPType.NONE;
    let name: string;
    let values;

    let head = line[0];
    let pos = 0;
    const end = line.length;
    if (head === '<') {
      type = RPPType.SECTION_START;
      ++pos;
    } else if (head === '>') {
      type = RPPType.SECTION_END;
    } else {
      type = RPPType.PROPERTY;
    }

    if (type === RPPType.SECTION_START || type === RPPType.PROPERTY) {
      name = '';
      while (pos < end && line[pos] !== ' ') {
        name += line[pos];
        ++pos;
      }

      values = [];
      while (pos < end) {
        if (line[pos] === ' ') {
          ++pos;
          continue;
        }
        const sep = ((head: string) => {
          switch (head) {
            case '`':
              ++pos;
              return '`';
            case "'":
              ++pos;
              return "'";
            case '"':
              ++pos;
              return '"';
            default:
              return ' ';
          }
        })(line[pos]);

        let value = '';
        while (pos < end) {
          if (line[pos] === sep) {
            ++pos;
            break;
          }
          value += line[pos];
          ++pos;
        }
        values.push(value);
      }
    }

    if (type === RPPType.PROPERTY && !values.length) {
      type = RPPType.DATA;
    }

    return { type, name, values };
  };

  class RPPSection {
    public name: string = '';
    public values: any[] = [];
    public properties: { [name: string]: any[][] } = {};
    public data: string = '';
    public children: { [name: string]: RPPSection[] } = {};
    constructor(name: string, values: any[]) {
      this.name = name;
      this.values = values;
    }
    load(lines: string[], row: number) {
      for (let total = lines.length; row < total; ++row) {
        const { type, name, values } = RPPParser(lines[row]);
        if (type === RPPType.SECTION_START) {
          let section = new RPPSection(name, values);
          if (!this.children[name]) {
            this.children[name] = [];
          }
          this.children[name].push(section);
          row = section.load(lines, row + 1);
        } else if (type === RPPType.PROPERTY) {
          if (!this.properties[name]) {
            this.properties[name] = [];
          }
          this.properties[name].push(values);
        } else if (type === RPPType.DATA) {
          this.data += name;
        } else if (type === RPPType.SECTION_END) {
          break;
        }
      }
      return row;
    }
  }

  class RPPItem {
    private position: number;
    private length: number;
    private mute: boolean;
    private track_mute: boolean;
    private iguid: string;
    private name: string;
    private soffs: number;
    private playrate: number;
    private source_type: string;
    private file: string;
    private sm: number[];
    constructor(section: RPPSection, track_mute: boolean) {
      this.position = +section.properties['POSITION'][0][0];
      this.length = +section.properties['LENGTH'][0][0];
      this.mute = +section.properties['MUTE'][0][0] === 1;
      this.track_mute = track_mute;
      this.iguid = section.properties['IGUID'][0][0];
      this.name = section.properties['NAME'][0][0];
      this.soffs = +section.properties['SOFFS'][0][0];
      this.playrate = +section.properties['PLAYRATE'][0][0];
      let source = section.children['SOURCE'][0];
      switch (source.values[0]) {
        case 'MIDI':
          this.source_type = 'MIDI';
          break;
        case 'SECTION':
          source = source.children['SOURCE'][0];
        default:
          this.source_type = source.values[0];
          this.file = source.properties['FILE'][0][0];
          break;
      }
      this.sm = Utils.map(Utils.filter(section.properties['SM'] ? section.properties['SM'][0] : [], val => val !== '+'), val => +val);
    }
    getSourceType() {
      return this.source_type;
    }
    isMute() {
      return this.mute || this.track_mute;
    }
    getIGUID() {
      return this.iguid;
    }
    getInPoint() {
      return this.position;
    }
    getOutPoint() {
      return this.position + this.length;
    }
    getEstimatedDuration() {
      return (this.length + this.soffs) * this.playrate;
    }
    getFilePath() {
      return this.file;
    }
    arrange(layer: AVLayer, { apply_stretch_markers, order_type }: {
      apply_stretch_markers: boolean;
      order_type: string;
    }) {
      layer.enabled = layer.audioEnabled = !this.isMute();
      if (this.name) {
        layer.name = this.name;
      }
      layer.comment = this.iguid;
      layer.inPoint = this.soffs;
      layer.stretch = 100 / this.playrate;
      layer.startTime += this.position - layer.inPoint;
      layer.outPoint = layer.inPoint + this.length;
      if (apply_stretch_markers && this.sm.length) {
        layer.timeRemapEnabled = true;
        const time_remap = <Property>layer.property('ADBE Time Remapping');
        const min_time = <number>time_remap.keyValue(1);
        const max_time = <number>time_remap.keyValue(2);
        const in_point = layer.inPoint;
        const out_point = layer.outPoint;
        const time_at_out_point = <number>time_remap.valueAtTime(out_point, true) - <number>time_remap.valueAtTime(in_point, true);

        let sm = this.sm.slice();
        while (sm.length) {
          let [x, y] = [sm.shift(), sm.shift()];
          x = (out_point - in_point) / time_at_out_point * x + in_point;
          time_remap.setValueAtTime(x, Utils.clamp(y, min_time, max_time));
        }
      }
      if (order_type === ORDER_TYPE.ASC) {
        layer.moveToEnd();
      } else {
        layer.moveToBeginning();
      }
    }
  }

  class CompAnalyzer {
    static GUID_REGEX = /(\{[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\})/i;
    private iguids: { [guid: string]: Layer; } = {};
    private master_layer: Layer = null;
    private tempo_layer: Layer = null;
    constructor(comp: CompItem) {
      //comp
      Utils.forEachLayer(comp, (layer: Layer) => {
        const comment = layer.comment;
        const m = CompAnalyzer.GUID_REGEX.exec(comment);
        if (m) {
          const iguid = m[1];
          this.iguids[iguid] = layer;
        } else if (comment.indexOf(RPPLoader.MASTER_TRACK_COMMENT) >= 0) {
          this.master_layer = layer;
        } else if (comment.indexOf(RPPLoader.TEMPO_TRACK_COMMENT) >= 0) {
          this.tempo_layer = layer;
        }
      });
    }
    containsIGUID(iguid: string) {
      return !!this.iguids[iguid];
    }
    containsMasterLayer() {
      return !!this.master_layer;
    }
    getMasterLayer() {
      return this.master_layer;
    }
    containsTempoLayer() {
      return !!this.tempo_layer;
    }
    getTempoLayer() {
      return this.tempo_layer;
    }
  }

  class RPPLoader {
    static loadContents(file: File) {
      if (!file.exists) {
        return '';
      }
      let contents = '';
      file.encoding = 'UTF-8';
      if (file.open('r')) {
        let header = file.read(RPP_HEADER.length);
        if (header === RPP_HEADER) {
          contents = header + file.read();
        }
        file.close();
      }
      return contents;
    }
    static MASTER_TRACK_COMMENT = '[Master Track]';
    static TEMPO_TRACK_COMMENT = '[Tempo Track]';
    private file: File = null;
    private size: [number, number, number] = [1280, 720, 0];
    private framerate: number = 30;
    private render_file: string = '';
    private items: RPPItem[] = [];
    private tempo: number[] = [];
    private markers: number[] = [];
    private clear() {
      this.file = null;
      this.size = [1280, 720, 0];
      this.framerate = 30;
      this.render_file = '';
      this.items = [];
      this.tempo = [];
      this.markers = [];
    }
    load(file: File, contents: string) {
      this.clear();

      this.file = file;

      //build tree
      const lines = contents.split(/\n/);
      const root_result = RPPParser(lines[0]);
      const root = new RPPSection(root_result.name, root_result.values);
      root.load(lines, 1);

      //items
      let mutes: boolean[] = [false];
      let prev_isbus: [number, number] = [0, 0];
      const tracks = root.children['TRACK'];
      Utils.forEach(tracks, (track: RPPSection) => {
        const mute = track.properties['MUTESOLO'][0][0] === '1';
        const isbus = <[number, number]>Utils.map(track.properties['ISBUS'][0], val => +val);
        const [cmd, delta] = prev_isbus;
        switch (cmd) {
          case 0:
            mutes[mutes.length - 1] = mute;
            break;
          case 1:
            mutes.push(mute);
            break;
          case 2:
            mutes = mutes.slice(0, mutes.length + delta);
            mutes[mutes.length - 1] = mute;
            break;
        }
        prev_isbus = isbus;
        const track_mute = Utils.some(mutes, mute => mute);
        const items = track.children['ITEM'] || [];
        Utils.forEach(items, (item: RPPSection) => {
          let rpp_item = new RPPItem(item, track_mute);
          this.items.push(rpp_item);
        });
      });

      //size
      if (root.properties['VIDEO_CONFIG']) {
        this.size = <[number, number, number]>Utils.map(root.properties['VIDEO_CONFIG'][0], val => +val);
      }

      //framerate
      if (root.properties['SMPTESYNC']) {
        this.framerate = +root.properties['SMPTESYNC'][0][1];
      }

      //render file
      if (root.properties['RENDER_FILE']) {
        this.render_file = root.properties['RENDER_FILE'][0][0];
      }

      //tempo
      if (root.properties['TEMPO']) {
        this.tempo = Utils.map(root.properties['TEMPO'][0], val => +val);
      }

      //markers
      if (root.properties['MARKER']) {
        this.markers = Utils.map(root.properties['MARKER'], (values: any[]) => {
          return +values[1];
        });
      }

      return {
        item_num: this.items.length,
        active_item_num: Utils.reduce(this.items, (total: number, item: RPPItem) => {
          if (!item.isMute()) {
            return total + 1;
          }
          return total;
        }, 0),
        framerate: this.framerate,
        size: this.size,
      };
    }
    execute({ target, sort, add_mute_tracks, apply_stretch_markers }: {
      target: string;
      sort: { order_by: string; order_type: string; };
      add_mute_tracks: boolean;
      apply_stretch_markers: boolean;
    }, is_child = false): CompItem {
      if (!this.items.length) {
        return null;
      }
      let comp: CompItem;
      if (target === TARGET.AUTO) {
        const item = Utils.getItem([Utils.ITEM_FILTER.COMP, (item: CompItem) => item.comment === this.file.absoluteURI]) as CompItem;
        if (item) {
          comp = item;
        } else {
          comp = this.createComp(is_child ? true : add_mute_tracks);
        }
      } else if (target === TARGET.NEW_COMP) {
        comp = this.createComp(add_mute_tracks);
      } else if (target === TARGET.ACTIVE_COMP) {
        comp = Utils.getActiveComp();
      } else {
        return null;
      }
      const analyzer = new CompAnalyzer(comp);
      this.createLayers(comp, analyzer, { sort, add_mute_tracks, apply_stretch_markers });
      this.createTempo(comp, analyzer);
      this.createMarkers(comp);
      comp.comment = this.file.absoluteURI;
      return comp;
    }
    private createComp(add_mute_tracks: boolean) {
      const duration: number = Utils.reduce(this.items, (duration: number, item: RPPItem) => {
        if (item.isMute() && !add_mute_tracks) {
          return duration;
        }
        return Math.max(duration, item.getOutPoint());
      }, 0) as number;
      return app.project.items.addComp(this.file.displayName, this.size[0] || 1280, this.size[1] || 720, 1, duration, this.framerate);
    }
    private createLayers(comp: CompItem, analyzer: CompAnalyzer, { sort, add_mute_tracks, apply_stretch_markers }: {
      sort: { order_by: string; order_type: string; };
      add_mute_tracks: boolean;
      apply_stretch_markers: boolean;
    }) {
      const av_store: { [file: string]: AVItem } = {};
      let items = sort.order_by === ORDER_BY.TIME ? this.items.slice().sort((lhs: RPPItem, rhs: RPPItem) => {
        return lhs.getInPoint() - rhs.getInPoint();
      }) : this.items;
      Utils.forEach(items, (item: RPPItem) => {
        if (analyzer.containsIGUID(item.getIGUID())) {
          return;
        } else if (item.isMute() && !add_mute_tracks) {
          return;
        }
        const source_type = item.getSourceType();
        if (source_type === 'MIDI') {
          return;
        }
        const file_path = item.getFilePath();
        let av_item: AVItem;
        switch (source_type) {
          case 'RPP_PROJECT':
            av_item = av_store[file_path] || (av_store[file_path] = this.importRPP(file_path, sort, add_mute_tracks, apply_stretch_markers));
            break;
          default:
            av_item = av_store[file_path] || (av_store[file_path] = this.importItem(file_path));
            break;
        }
        const layer = comp.layers.add(av_item);
        item.arrange(layer, { apply_stretch_markers, order_type: sort.order_type });
      });
      //add render file
      if (this.render_file) {
        if (!analyzer.containsMasterLayer()) {
          const file_path = this.render_file;
          try {
            const av_item = av_store[file_path] || (av_store[file_path] = this.importItem(file_path, false));
            const render_layer = comp.layers.add(av_item);
            render_layer.comment = RPPLoader.MASTER_TRACK_COMMENT;
            render_layer.name = 'Master';
            if (render_layer.outPoint > comp.duration) {
              comp.duration = render_layer.outPoint;
            }
          } catch (e) {
            //pass
          }
        }
      }
    }
    private importRPP(path: string, sort: { order_by: string; order_type: string; }, add_mute_tracks: boolean, apply_stretch_markers: boolean): AVItem {
      const file = getFileByPath(path, this.file.parent.absoluteURI);
      if (!file.exists) {
        throw new Error(`Not found: ${path}`);
      }
      const contents = RPPLoader.loadContents(file);
      if (!contents) {
        throw `${path} isn't a RPP file`;
      }
      const new_loader = new RPPLoader;
      new_loader.load(file, contents);
      const item = new_loader.execute({
        target: TARGET.AUTO,
        sort,
        add_mute_tracks,
        apply_stretch_markers,
      }, true);
      return item;
    }
    private importItem(path: string, placeholder = true): AVItem {
      let file = getFileByPath(path, this.file.parent.absoluteURI);
      if (!file.exists) {
        if (placeholder) {
          return this.importPlaceholder(file, path);
        }
        throw new Error(`Not found: ${path}`);
      }
      return Utils.getItem([Utils.ITEM_FILTER.FOOTAGE, (item: FootageItem) => item.file && item.file.absoluteURI === file.absoluteURI]) as FootageItem || app.project.importFile(new ImportOptions(file));
    }
    private importPlaceholder(file: File, path: string): AVItem {
      const items = Utils.filter(this.items, (item: RPPItem) => item.getFilePath() === path);
      const duration = Utils.reduce(items, (duration: number, item: RPPItem) => Math.max(duration, item.getEstimatedDuration()), 0) as number;
      return app.project.importPlaceholder(file.displayName, this.size[0], this.size[1], this.framerate, duration);
    }
    private createTempo(comp: CompItem, analyzer: CompAnalyzer) {
      if (this.tempo.length !== 3) {
        return;
      } else if (analyzer.containsTempoLayer()) {
        return;
      }

      const [bpm, beats, note] = this.tempo;
      const bps = bpm / 60;
      const tempo_layer = comp.layers.addNull();
      tempo_layer.enabled = false;
      tempo_layer.comment = RPPLoader.TEMPO_TRACK_COMMENT;
      tempo_layer.name = `${bpm} ${beats}/${note}`;
      const marker = <Property>tempo_layer.property('ADBE Marker');
      const duration = comp.duration;
      for (let i = 0; ; ++i) {
        const time = i / bps;
        if (time > duration) {
          break;
        }
        const beat = (i % beats) + 1;
        const marker_value = new MarkerValue(`${beat}`);
        marker.setValueAtTime(time, marker_value);
      }
    }
    private createMarkers(comp: CompItem) {
      if (this.markers.length) {
        if (AE_VERSION >= AppVersion.CS6) {
          comp.openInViewer();
          Utils.deselectLayers(comp);
          Utils.forEach(this.markers, (marker: number) => {
            comp.time = marker;
            app.executeCommand(CommandID.AddMarker);
          });
        }
      }
    }
  }

  //Main
  const PARAM = {
    LOAD_START: 'Load Start',
    RPP: 'RPP',
    LOAD: 'Load',
    INFO: 'Info',
    LOAD_END: 'Load End',
    EXECUTE_START: 'Execute Start',
    TARGET: 'Target',
    SORT: 'Sort',
    OPTIONS: 'Options',
    EXECUTE: 'Execute',
    EXECUTE_END: 'Execute End',
  };

  const TARGET = {
    AUTO: 'Auto',
    NEW_COMP: 'New Comp',
    ACTIVE_COMP: 'Active Comp',
  };

  const SORT = {
    ORDER_BY: 0,
    ORDER_TYPE: 1,
  };

  const ORDER_BY = {
    TRACK: 'Track',
    TIME: 'Time',
  };

  const ORDER_TYPE = {
    ASC: 'Ascending',
    DESC: 'Descending'
  };

  const OPTIONS = {
    ADD_MUTE_TRACKS: 0,
    APPLY_STRETCH_MARKERS: 1,
  };

  const loader = new RPPLoader;

  const builder = new UIBuilder(global, SCRIPT_NAME, {
    version: '0.0.0',
    author: 'Kareobana',
    url: 'http://atarabi.com/',
    numberOfScriptColumns: 2,
    width: 260,
    titleWidth: 50,
  });

  builder
    .addPanel(PARAM.LOAD_START, 'Load')
    .addFile(PARAM.RPP, '', {
      callback: () => {
        const file_path = builder.get(PARAM.RPP);
        const file = new File(file_path);
        if (file.exists) {
          builder.execute(PARAM.LOAD);
        }
      },
      filter: '*.rpp',
    })
    .addScript(PARAM.LOAD, () => {
      const file_path = builder.get(PARAM.RPP);
      const file = new File(file_path);
      const contents = RPPLoader.loadContents(file);
      if (!contents) {
        return alert('Not a RPP file');
      }
      const { item_num, active_item_num, framerate, size } = loader.load(file, contents);
      builder.set(PARAM.INFO, `item: ${item_num}(active: ${active_item_num}), size: [${size[0]}, ${size[1]}], fps: ${framerate}`);
    })
    .addStatictext(PARAM.INFO, '', {
      title: false,
    })
    .addPanelEnd(PARAM.LOAD_END)
    .addPanel(PARAM.EXECUTE_START, 'Execute')
    .addPopup(PARAM.TARGET, Utils.values(TARGET))
    .addPopups(PARAM.SORT, [Utils.values(ORDER_BY), Utils.values(ORDER_TYPE)])
    .addCheckboxes(PARAM.OPTIONS, [
      { text: 'Add mute tracks', value: false },
      { text: 'Apply stretch markers', value: true },
    ], { title: false })
    .addScript(PARAM.EXECUTE, () => {
      const comp = loader.execute({
        target: builder.get(PARAM.TARGET),
        sort: {
          order_by: builder.get(PARAM.SORT, SORT.ORDER_BY),
          order_type: builder.get(PARAM.SORT, SORT.ORDER_TYPE),
        },
        add_mute_tracks: builder.get(PARAM.OPTIONS, OPTIONS.ADD_MUTE_TRACKS),
        apply_stretch_markers: builder.get(PARAM.OPTIONS, OPTIONS.APPLY_STRETCH_MARKERS),
      });
      if (comp) {
        comp.openInViewer();
      }
    })
    .addPanelEnd(PARAM.EXECUTE_END)
    .build();

  //function
  function log(obj) {
    if (DEBUG) {
      $.writeln(JSON.stringify(obj, undefined, '  '));
    }
  }

})(this);