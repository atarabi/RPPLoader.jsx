/*
 *  RPPLoader.jsx v0.0.0 / ScriptUI
 *
 *  Author: Kareobana(http://atarabi.com/)
 *  License: MIT
 *  Dependencies:
 *    Kikaku.jsx
 */
/// <reference path="./typings/aftereffects/ae.d.ts" />
/// <reference path="./typings/kikaku/Kikaku.d.ts" />
(function (global) {
    //Lib
    var Utils = KIKAKU.Utils;
    var JSON = KIKAKU.JSON;
    var UIBuilder = KIKAKU.UIBuilder;
    var PARAMETER_TYPE = UIBuilder.PARAMETER_TYPE;
    //Constants
    var SCRIPT_NAME = 'RPPLoader';
    var AE_VERSION = parseFloat(app.version);
    var DEBUG = false;
    //RPP
    var RPP_HEADER = '<REAPER_PROJECT';
    var RPPType;
    (function (RPPType) {
        RPPType[RPPType["NONE"] = -1] = "NONE";
        RPPType[RPPType["SECTION_START"] = 0] = "SECTION_START";
        RPPType[RPPType["PROPERTY"] = 1] = "PROPERTY";
        RPPType[RPPType["DATA"] = 2] = "DATA";
        RPPType[RPPType["SECTION_END"] = 3] = "SECTION_END";
    })(RPPType || (RPPType = {}));
    var RPPParser = function (line) {
        line = Utils.trim(line);
        if (!line.length) {
            return { type: RPPType.NONE };
        }
        var type = RPPType.NONE;
        var name;
        var values;
        var head = line[0];
        var pos = 0;
        var end = line.length;
        if (head === '<') {
            type = RPPType.SECTION_START;
            ++pos;
        }
        else if (head === '>') {
            type = RPPType.SECTION_END;
        }
        else {
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
                var sep = (function (head) {
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
                var value = '';
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
        return { type: type, name: name, values: values };
    };
    var RPPSection = (function () {
        function RPPSection(name, values) {
            this.name = '';
            this.values = [];
            this.properties = {};
            this.data = '';
            this.children = {};
            this.name = name;
            this.values = values;
        }
        RPPSection.prototype.load = function (lines, row) {
            for (var total = lines.length; row < total; ++row) {
                var _a = RPPParser(lines[row]), type = _a.type, name = _a.name, values = _a.values;
                if (type === RPPType.SECTION_START) {
                    var section = new RPPSection(name, values);
                    if (!this.children[name]) {
                        this.children[name] = [];
                    }
                    this.children[name].push(section);
                    row = section.load(lines, row + 1);
                }
                else if (type === RPPType.PROPERTY) {
                    if (!this.properties[name]) {
                        this.properties[name] = [];
                    }
                    this.properties[name].push(values);
                }
                else if (type === RPPType.DATA) {
                    this.data += name;
                }
                else if (type === RPPType.SECTION_END) {
                    break;
                }
            }
            return row;
        };
        return RPPSection;
    })();
    var RPPItem = (function () {
        function RPPItem(section, track_mute) {
            this.position = +section.properties['POSITION'][0][0];
            this.length = +section.properties['LENGTH'][0][0];
            this.mute = +section.properties['MUTE'][0][0] === 1;
            this.track_mute = track_mute;
            this.iguid = section.properties['IGUID'][0][0];
            this.name = section.properties['NAME'][0][0];
            this.soffs = +section.properties['SOFFS'][0][0];
            this.playrate = +section.properties['PLAYRATE'][0][0];
            var source = section.children['SOURCE'][0];
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
            this.sm = Utils.map(Utils.filter(section.properties['SM'] ? section.properties['SM'][0] : [], function (val) { return val !== '+'; }), function (val) { return +val; });
        }
        RPPItem.prototype.isMIDI = function () {
            return this.source_type === 'MIDI';
        };
        RPPItem.prototype.isMute = function () {
            return this.mute || this.track_mute;
        };
        RPPItem.prototype.getIGUID = function () {
            return this.iguid;
        };
        RPPItem.prototype.getInPoint = function () {
            return this.position;
        };
        RPPItem.prototype.getOutPoint = function () {
            return this.position + this.length;
        };
        RPPItem.prototype.getEstimatedDuration = function () {
            return (this.length + this.soffs) * this.playrate;
        };
        RPPItem.prototype.getFilePath = function () {
            return this.file;
        };
        RPPItem.prototype.arrange = function (layer, _a) {
            var apply_stretch_markers = _a.apply_stretch_markers, order_type = _a.order_type;
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
                var time_remap = layer.property('ADBE Time Remapping');
                var min_time = time_remap.keyValue(1);
                var max_time = time_remap.keyValue(2);
                var in_point = layer.inPoint;
                var out_point = layer.outPoint;
                var time_at_out_point = time_remap.valueAtTime(out_point, true) - time_remap.valueAtTime(in_point, true);
                var sm = this.sm.slice();
                while (sm.length) {
                    var _b = [sm.shift(), sm.shift()], x = _b[0], y = _b[1];
                    x = (out_point - in_point) / time_at_out_point * x + in_point;
                    time_remap.setValueAtTime(x, Utils.clamp(y, min_time, max_time));
                }
            }
            if (order_type === ORDER_TYPE.ASC) {
                layer.moveToEnd();
            }
            else {
                layer.moveToBeginning();
            }
        };
        return RPPItem;
    })();
    var CompAnalyzer = (function () {
        function CompAnalyzer(comp) {
            var _this = this;
            this.iguids = {};
            this.master_layer = null;
            this.tempo_layer = null;
            //comp
            Utils.forEachLayer(comp, function (layer) {
                var comment = layer.comment;
                var m = CompAnalyzer.GUID_REGEX.exec(comment);
                if (m) {
                    var iguid = m[1];
                    _this.iguids[iguid] = layer;
                }
                else if (comment.indexOf(RPPLoader.MASTER_TRACK_COMMENT) >= 0) {
                    _this.master_layer = layer;
                }
                else if (comment.indexOf(RPPLoader.TEMPO_TRACK_COMMENT) >= 0) {
                    _this.tempo_layer = layer;
                }
            });
        }
        CompAnalyzer.prototype.containsIGUID = function (iguid) {
            return !!this.iguids[iguid];
        };
        CompAnalyzer.prototype.containsMasterLayer = function () {
            return !!this.master_layer;
        };
        CompAnalyzer.prototype.getMasterLayer = function () {
            return this.master_layer;
        };
        CompAnalyzer.prototype.containsTempoLayer = function () {
            return !!this.tempo_layer;
        };
        CompAnalyzer.prototype.getTempoLayer = function () {
            return this.tempo_layer;
        };
        CompAnalyzer.GUID_REGEX = /(\{[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\})/i;
        return CompAnalyzer;
    })();
    var RPPLoader = (function () {
        function RPPLoader() {
            this.file = null;
            this.size = [1280, 720, 0];
            this.framerate = 30;
            this.render_file = '';
            this.items = [];
            this.tempo = [];
            this.markers = [];
        }
        RPPLoader.prototype.clear = function () {
            this.file = null;
            this.size = [1280, 720, 0];
            this.framerate = 30;
            this.render_file = '';
            this.items = [];
            this.tempo = [];
            this.markers = [];
        };
        RPPLoader.prototype.load = function (file, contents) {
            var _this = this;
            this.clear();
            this.file = file;
            //build tree
            var lines = contents.split(/\n/);
            var root_result = RPPParser(lines[0]);
            var root = new RPPSection(root_result.name, root_result.values);
            root.load(lines, 1);
            //items
            var mutes = [false];
            var prev_isbus = [0, 0];
            var tracks = root.children['TRACK'];
            Utils.forEach(tracks, function (track) {
                var mute = track.properties['MUTESOLO'][0][0] === '1';
                var isbus = Utils.map(track.properties['ISBUS'][0], function (val) { return +val; });
                var cmd = prev_isbus[0], delta = prev_isbus[1];
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
                var track_mute = Utils.some(mutes, function (mute) { return mute; });
                var items = track.children['ITEM'] || [];
                Utils.forEach(items, function (item) {
                    var rpp_item = new RPPItem(item, track_mute);
                    if (!rpp_item.isMIDI()) {
                        _this.items.push(rpp_item);
                    }
                });
            });
            //size
            if (root.properties['VIDEO_CONFIG']) {
                this.size = Utils.map(root.properties['VIDEO_CONFIG'][0], function (val) { return +val; });
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
                this.tempo = Utils.map(root.properties['TEMPO'][0], function (val) { return +val; });
            }
            //markers
            if (root.properties['MARKER']) {
                this.markers = Utils.map(root.properties['MARKER'], function (values) {
                    return +values[1];
                });
            }
            return {
                item_num: this.items.length,
                active_item_num: Utils.reduce(this.items, function (total, item) {
                    if (!item.isMute()) {
                        return total + 1;
                    }
                    return total;
                }, 0),
                framerate: this.framerate,
                size: this.size
            };
        };
        RPPLoader.prototype.execute = function (_a) {
            var target = _a.target, sort = _a.sort, add_mute_tracks = _a.add_mute_tracks, apply_stretch_markers = _a.apply_stretch_markers;
            if (!this.items.length) {
                return;
            }
            var comp = target === TARGET.NEW_COMP ? this.createComp(add_mute_tracks) : Utils.getActiveComp();
            if (!comp) {
                return;
            }
            var analyzer = new CompAnalyzer(comp);
            this.createLayers(comp, analyzer, { sort: sort, add_mute_tracks: add_mute_tracks, apply_stretch_markers: apply_stretch_markers });
            this.createTempo(comp, analyzer);
            this.createMarkers(comp);
        };
        RPPLoader.prototype.createComp = function (add_mute_tracks) {
            var duration = Utils.reduce(this.items, function (duration, item) {
                if (item.isMute() && !add_mute_tracks) {
                    return duration;
                }
                return Math.max(duration, item.getOutPoint());
            }, 0);
            return app.project.items.addComp(this.file.displayName, this.size[0], this.size[1], 1, duration, this.framerate);
        };
        RPPLoader.prototype.createLayers = function (comp, analyzer, _a) {
            var _this = this;
            var sort = _a.sort, add_mute_tracks = _a.add_mute_tracks, apply_stretch_markers = _a.apply_stretch_markers;
            var av_store = {};
            var items = sort.order_by === ORDER_BY.TIME ? this.items.slice().sort(function (lhs, rhs) {
                return lhs.getInPoint() - rhs.getInPoint();
            }) : this.items;
            Utils.forEach(items, function (item) {
                if (analyzer.containsIGUID(item.getIGUID())) {
                    return;
                }
                else if (item.isMute() && !add_mute_tracks) {
                    return;
                }
                var file_path = item.getFilePath();
                var av_item = av_store[file_path] || (av_store[file_path] = _this.importItem(file_path));
                var layer = comp.layers.add(av_item);
                item.arrange(layer, { apply_stretch_markers: apply_stretch_markers, order_type: sort.order_type });
            });
            //add render file
            if (this.render_file) {
                if (!analyzer.containsMasterLayer()) {
                    var file_path = this.render_file;
                    try {
                        var av_item = av_store[file_path] || (av_store[file_path] = this.importItem(file_path, false));
                        var render_layer = comp.layers.add(av_item);
                        render_layer.comment = RPPLoader.MASTER_TRACK_COMMENT;
                        render_layer.name = 'Master';
                        if (render_layer.outPoint > comp.duration) {
                            comp.duration = render_layer.outPoint;
                        }
                    }
                    catch (e) {
                    }
                }
            }
        };
        RPPLoader.prototype.importItem = function (path, placeholder) {
            if (placeholder === void 0) { placeholder = true; }
            var file = new File(path);
            if (!file.exists) {
                file = new File(this.file.parent.fullName + '/' + path);
                if (!file.exists) {
                    if (placeholder) {
                        return this.importPlaceholder(file, path);
                    }
                    throw new Error("Not found: " + path);
                }
            }
            return Utils.getItem([Utils.ITEM_FILTER.FOOTAGE, function (item) { return item.file.absoluteURI === file.absoluteURI; }]) || app.project.importFile(new ImportOptions(file));
        };
        RPPLoader.prototype.importPlaceholder = function (file, path) {
            var items = Utils.filter(this.items, function (item) { return item.getFilePath() === path; });
            var duration = Utils.reduce(items, function (duration, item) { return Math.max(duration, item.getEstimatedDuration()); }, 0);
            return app.project.importPlaceholder(file.displayName, this.size[0], this.size[1], this.framerate, duration);
        };
        RPPLoader.prototype.createTempo = function (comp, analyzer) {
            if (this.tempo.length !== 3) {
                return;
            }
            else if (analyzer.containsTempoLayer()) {
                return;
            }
            var _a = this.tempo, bpm = _a[0], beats = _a[1], note = _a[2];
            var bps = bpm / 60;
            var tempo_layer = comp.layers.addNull();
            tempo_layer.enabled = false;
            tempo_layer.comment = RPPLoader.TEMPO_TRACK_COMMENT;
            tempo_layer.name = bpm + " " + beats + "/" + note;
            var marker = tempo_layer.property('ADBE Marker');
            var duration = comp.duration;
            for (var i = 0;; ++i) {
                var time = i / bps;
                if (time > duration) {
                    break;
                }
                var beat = (i % beats) + 1;
                var marker_value = new MarkerValue("" + beat);
                marker.setValueAtTime(time, marker_value);
            }
        };
        RPPLoader.prototype.createMarkers = function (comp) {
            if (this.markers.length) {
                if (AE_VERSION >= 11 /* CS6 */) {
                    comp.openInViewer();
                    Utils.deselectLayers(comp);
                    Utils.forEach(this.markers, function (marker) {
                        comp.time = marker;
                        app.executeCommand(2157 /* AddMarker */);
                    });
                }
            }
        };
        RPPLoader.MASTER_TRACK_COMMENT = '[Master Track]';
        RPPLoader.TEMPO_TRACK_COMMENT = '[Tempo Track]';
        return RPPLoader;
    })();
    //Main
    var PARAM = {
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
        EXECUTE_END: 'Execute End'
    };
    var TARGET = {
        NEW_COMP: 'New Comp',
        ACTIVE_COMP: 'Active Comp'
    };
    var SORT = {
        ORDER_BY: 0,
        ORDER_TYPE: 1
    };
    var ORDER_BY = {
        TIME: 'Time',
        TRACK: 'Track'
    };
    var ORDER_TYPE = {
        ASC: 'Ascending',
        DESC: 'Descending'
    };
    var OPTIONS = {
        ADD_MUTE_TRACKS: 0,
        APPLY_STRETCH_MARKERS: 1
    };
    var loader = new RPPLoader;
    var builder = new UIBuilder(global, SCRIPT_NAME, {
        version: '0.0.0',
        author: 'Kareobana',
        url: 'http://atarabi.com/',
        numberOfScriptColumns: 2,
        width: 260,
        titleWidth: 50
    });
    builder
        .add(PARAMETER_TYPE.PANEL, PARAM.LOAD_START, 'Load')
        .add(PARAMETER_TYPE.FILE, PARAM.RPP, '', {
        callback: function () {
            var file_path = builder.get(PARAM.RPP);
            var file = new File(file_path);
            if (file.exists) {
                builder.execute(PARAM.LOAD);
            }
        },
        filter: '*.rpp'
    })
        .add(PARAMETER_TYPE.SCRIPT, PARAM.LOAD, function () {
        var file_path = builder.get(PARAM.RPP);
        var file = new File(file_path);
        if (!file.exists) {
            return;
        }
        file.encoding = 'UTF-8';
        var contents = '';
        if (file.open('r')) {
            var header = file.read(RPP_HEADER.length);
            if (header !== RPP_HEADER) {
                return alert('Not a RPP file');
            }
            contents = header + file.read();
            file.close();
        }
        else {
            return;
        }
        var _a = loader.load(file, contents), item_num = _a.item_num, active_item_num = _a.active_item_num, framerate = _a.framerate, size = _a.size;
        builder.set(PARAM.INFO, "item: " + item_num + "(active: " + active_item_num + "), size: [" + size[0] + ", " + size[1] + "], fps: " + framerate);
    })
        .add(PARAMETER_TYPE.STATICTEXT, PARAM.INFO, '', {
        title: false
    })
        .add(PARAMETER_TYPE.PANEL_END, PARAM.LOAD_END)
        .add(PARAMETER_TYPE.PANEL, PARAM.EXECUTE_START, 'Execute')
        .add(PARAMETER_TYPE.POPUP, PARAM.TARGET, Utils.values(TARGET))
        .add(PARAMETER_TYPE.POPUPS, PARAM.SORT, [Utils.values(ORDER_BY), Utils.values(ORDER_TYPE)])
        .add(PARAMETER_TYPE.CHECKBOXES, PARAM.OPTIONS, [
        { text: 'Add mute tracks', value: false },
        { text: 'Apply stretch markers', value: true },
    ], { title: false })
        .add(PARAMETER_TYPE.SCRIPT, PARAM.EXECUTE, function () {
        loader.execute({
            target: builder.get(PARAM.TARGET),
            sort: {
                order_by: builder.get(PARAM.SORT, SORT.ORDER_BY),
                order_type: builder.get(PARAM.SORT, SORT.ORDER_TYPE)
            },
            add_mute_tracks: builder.get(PARAM.OPTIONS, OPTIONS.ADD_MUTE_TRACKS),
            apply_stretch_markers: builder.get(PARAM.OPTIONS, OPTIONS.APPLY_STRETCH_MARKERS)
        });
    })
        .add(PARAMETER_TYPE.PANEL_END, PARAM.EXECUTE_END)
        .build();
    //function
    function log(obj) {
        if (DEBUG) {
            $.writeln(JSON.stringify(obj, undefined, '  '));
        }
    }
})(this);
