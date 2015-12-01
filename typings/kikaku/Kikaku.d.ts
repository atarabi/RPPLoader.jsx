/// <reference path="../aftereffects/ae.d.ts" />
declare namespace KIKAKU {
    var VERSION: string;
    var AUTHOR: string;
    var LICENSE: string;
}
declare namespace KIKAKU.Utils {
    var VERSION: string;
    var AUTHOR: string;
}
declare namespace KIKAKU.Utils {
    function isObject(arg: any): boolean;
    function isArray(arg: any): boolean;
    function isFunction(arg: any): boolean;
    function isString(arg: any): boolean;
    function isNumber(arg: any): boolean;
    function isBoolean(arg: any): boolean;
    function isUndefined(arg: any): boolean;
    function keys(obj: Object): any[];
    function values(obj: Object): any[];
    function forEach(obj: any, fn: ((value, index?: number) => any) | ((value, key?: string) => any), ctx?: any): void;
    function inherits(child: any, parent: any): void;
    function assign(obj: any, ...args: any[]): any;
    function map<T, U>(arr: T[], fn: (T, index?: number) => U, ctx?: any): U[];
    function reduce<T, U>(arr: T[], fn: (prev: U, cur: T, index?: number, arr?: T[]) => U, initial_value?: U): any;
    function filter<T>(arr: T[], fn: (value: T, index?: number) => boolean, ctx?: any): T[];
    function some<T>(arr: T[], fn: (value: T) => boolean, ctx?: any): boolean;
    function every<T>(arr: T[], fn: (value: T) => boolean, ctx?: any): boolean;
    function inArray<T>(arr: T[], fn: (T) | ((v: T) => boolean), ctx?: any): number;
    function find<T>(arr: T[], fn: (v: T) => boolean, ctx?: any): T;
    function unique<T>(arr: T[]): T[];
    function clamp(value: number, mn?: number, mx?: number): number;
    function trim(str: string): string;
    function startsWith(str: string, search: string, position?: number): boolean;
    function endsWith(str: string, search: string, position?: number): boolean;
}
declare namespace KIKAKU.Utils {
    function getProjectFile(): File;
    function createFolder(path: string | Folder): void;
    function removeFolder(path: string | Folder): void;
}
declare namespace KIKAKU.Utils._Impl {
    function not(fn: any, ctx?: any): () => boolean;
    function and(fns?: any, ...other: any[]): () => boolean;
    function or(fns?: any, ...other: any[]): () => boolean;
    function operate(lhs: any, op: any, rhs: any): boolean;
    function createOperatorFilter(fn: any, op: any, rhs: any): (obj: any) => boolean;
}
declare namespace KIKAKU.Utils {
    function isFootageItem(item: Item): boolean;
    function isCompItem(item: Item): boolean;
    function isAVItem(item: Item): boolean;
    function isSolidItem(item: Item): boolean;
    function isFolderItem(item: Item): boolean;
    function forEachItem(fn: (item: Item, index?: number) => any, ctx?: any): void;
    function forEachItemInFolderItem(folder: FolderItem, fn: (item: Item, index?: number) => any, ctx?: any): void;
    const ITEM_FILTER: {
        NONE: string;
        ALL: string;
        FOOTAGE: string;
        COMP: string;
        AV: string;
        SOLID: string;
        FOLDER: string;
        NAME: string;
        COMMENT: string;
        SELECTED: string;
        WIDTH: string;
        HEIGHT: string;
        PIXEL_ASPECT: string;
        FRAME_RATE: string;
        FRAME_DURATION: string;
        DURATION: string;
        USE_PROXY: string;
        TIME: string;
        HAS_VIDEO: string;
        HAS_AUDIO: string;
        FOOTAGE_MISSING: string;
        DROP_FRAME: string;
        WORK_AREA_START: string;
        WORK_AREA_DURATION: string;
        NUM_LAYERS: string;
        HIDE_SHY_LAYERS: string;
        MOTION_BLUR: string;
        DRAFT3D: string;
        FRAME_BLENDING: string;
        PRESERVE_NESTED_FRAME_RATE: string;
        DISPLAY_START_TIME: string;
        SHUTTER_ANGLE: string;
        SHUTTER_PHASE: string;
    };
    function createItemFilter(...filters: any[]): (item: Item) => boolean;
    function getItems(filters?: any[]): Item[];
    function getItem(filters?: any[]): Item;
    function getActiveItem(): Item;
    function getActiveComp(): CompItem;
    function getCompByName(name: string): CompItem;
    function getAVItemByName(name: string): AVItem;
}
declare namespace KIKAKU.Utils {
    function isLayer(layer: Layer): boolean;
    function isTextLayer(layer: Layer): boolean;
    function isShapeLayer(layer: Layer): boolean;
    function isAVLayer(layer: Layer, strict?: boolean): boolean;
    function isCameraLayer(layer: Layer): boolean;
    function isLightLayer(layer: Layer): boolean;
    function isNullLayer(layer: Layer): boolean;
    function isSolidLayer(layer: Layer): boolean;
    function isFileLayer(layer: Layer): boolean;
    function isStillLayer(layer: Layer): boolean;
    function isCompLayer(layer: Layer): boolean;
    function forEachLayer(comp: CompItem, fn: (layer: Layer, index?: number) => any, ctx?: any): void;
    function forEachPropertyGroup(property_group: PropertyGroup | Layer, fn: (property: PropertyBase, index?: number) => any, ctx?: any): void;
    function forEachEffect(layer: Layer, fn: (effect: PropertyGroup, index?: number) => any, ctx?: any): void;
    var LAYER_FILTER: {
        NONE: string;
        ALL: string;
        TEXT: string;
        SHAPE: string;
        AV: string;
        CAMERA: string;
        LIGHT: string;
        NULL: string;
        INDEX: string;
        NAME: string;
        TIME: string;
        START_TIME: string;
        STRETCH: string;
        IN_POINT: string;
        OUT_POINT: string;
        ENABLED: string;
        SOLO: string;
        SHY: string;
        LOCKED: string;
        HAS_VIDEO: string;
        ACTIVE: string;
        COMMENT: string;
        IS_NAME_SET: string;
        SELECTED: string;
        SOLID: string;
        FILE: string;
        STILL: string;
        COMP: string;
        IS_NAME_FROM_SOURCE: string;
        HEIGHT: string;
        WIDTH: string;
        AUDIO_ENABLED: string;
        MOTION_BLUR: string;
        EFFECT_ACTIVE: string;
        ADJUSTMENT_LAYER: string;
        GUIDE_LAYER: string;
        THREED_LAYER: string;
        THREED_PER_CHAR: string;
        ENVIRONMENT_LAYER: string;
        COLLAPSE_TRANSFORMATION: string;
        FRAME_BLENDING: string;
        TIME_REAMP_ENABLED: string;
        HAS_AUDIO: string;
        AUDIO_ACTIVE: string;
        PRESERVE_TRANSPARENCY: string;
        IS_TRACK_MATTE: string;
        HAS_TRACK_MATTE: string;
    };
    function createLayerFilter(...filters: any[]): (layer: Layer) => boolean;
    function getLayers(filters?: any[], comp?: CompItem): Layer[];
    function getLayer(filters?: any[], comp?: CompItem): Layer;
    function getLayerByName(name: string, comp?: CompItem): Layer;
    function selectLayers(filters?: any[], deselect?: boolean, comp?: CompItem): boolean;
    function selectLayer(filters?: any[], deselect?: boolean, comp?: CompItem): boolean;
    function deselectLayers(comp?: CompItem): void;
    function getSelectedLayers(comp?: CompItem): Layer[];
    function getSelectedLayer(comp?: CompItem): Layer;
    function removeAllLayers(comp?: CompItem): void;
}
declare namespace KIKAKU.Utils {
    function isProperty(property: PropertyBase): boolean;
    function isPropertyGroup(property: PropertyBase): boolean;
    function isHiddenProperty(property: PropertyBase): boolean;
    function getPropertyDimensions(property: Property): number;
    const PROPERTY_FILTER: {
        NONE: string;
        ALL: string;
        PROPERTY: string;
        PROPERTY_GROUP: string;
        NAME: string;
        MATCH_NAME: string;
        PROPERTY_INDEX: string;
        PROPERTY_DEPTH: string;
        IS_MODIFIED: string;
        CAN_SET_ENABLED: string;
        ENABLED: string;
        ACTIVE: string;
        ELIDED: string;
        IS_EFFECT: string;
        IS_MASK: string;
        SELECTED: string;
        NO_VALUE: string;
        THREED_SPATIAL: string;
        THREED: string;
        TWOD_SPATIAL: string;
        TWOD: string;
        ONED: string;
        COLOR: string;
        CUSTOM_VALUE: string;
        MARKER: string;
        LAYER_INDEX: string;
        MASK_INDEX: string;
        SHAPE: string;
        TEXT_DOCUMENT: string;
        DIMENSIONS: string;
        HAS_MIN: string;
        HAS_MAX: string;
        IS_SPATIAL: string;
        CAN_VARY_OVER_TIME: string;
        IS_TIME_VARYING: string;
        NUM_KEYS: string;
        CAN_SET_EXPRESSION: string;
        EXPRESSION_ENABLED: string;
        DIMENSION_SEPARATED: string;
        IS_SEPRATION_FOLLOWER: string;
    };
    function createPropertyFilter(...filters: any[]): (property: PropertyBase) => boolean;
    function getSelectedProperties(options?: {
        multiple?: boolean;
        propertyGroup?: boolean;
        filter?: (property: PropertyBase) => boolean;
    }): PropertyBase[];
    function getSelectedPropertiesWithLayer(options?: {
        multiple?: boolean;
        propertyGroup?: boolean;
        filter?: (property: PropertyBase) => boolean;
    }): {
        layer: Layer;
        properties: PropertyBase[];
    }[];
    function getSelectedProperty(): Property;
    function getSelectedPropertyWithLayer(): {
        layer: Layer;
        property: Property;
    };
    function getPathOfProperty(property: PropertyBase, match_name?: boolean): string[];
    function getPathOfSelectedProperty(match_name?: boolean): string[];
    function getPropertyFromPath(layer: Layer, path: string[]): PropertyBase;
    function getLayerOfProperty(property: PropertyBase): Layer;
    function removeAllKeys(property: Property): void;
    function scaleOneDProperty(property: Property, scale: number): void;
    function scaleTwoDProperty(property: Property, scale: [number, number], tangent?: boolean): void;
    function scaleThreeDProperty(property: Property, scale: [number, number, number], tangent?: boolean): void;
    function scaleShapeProperty(property: Property, scale: [number, number], src_origin?: [number, number], dst_origin?: [number, number]): void;
}
declare namespace KIKAKU.Utils {
    type Color = [number, number, number, number];
    function rgbToHsl(rgba: Color): Color;
    function hslToRgb(hsla: Color): Color;
    function rgbToYuv(rgba: Color): Color;
    function yuvToRgb(yuva: Color): Color;
}
declare namespace KIKAKU {
    interface JSON {
        parse(text: string, reviver?: (key: any, value: any) => any): any;
        stringify(value: any): string;
        stringify(value: any, replacer: (key: string, value: any) => any): string;
        stringify(value: any, replacer: any[]): string;
        stringify(value: any, replacer: (key: string, value: any) => any, space: any): string;
        stringify(value: any, replacer: any[], space: any): string;
    }
    var JSON: JSON;
}
declare namespace KIKAKU.Utils.Comment {
    function get(layer_or_item: Layer | Item, key: string): any;
    function set(layer_or_item: Layer | Item, key: string, value: any): void;
    function remove(layer_or_item: Layer | Item, key: string): void;
}
declare namespace KIKAKU {
    class EventDispatcher {
        static VERSION: string;
        static AUTHOR: string;
        private _listners;
        addEventListener(type: string, fn: Function, ctx?: any): void;
        removeEventListener(type: string, fn: Function | string, ctx?: any): void;
        dispatchEvent(type: string): void;
    }
}
declare namespace KIKAKU {
    class FileManager {
        static VERSION: string;
        static AUTHOR: string;
        static TYPE: {
            CUSTOM: string;
            APP_DATA: string;
            COMMON_FILES: string;
            DESKTOP: string;
            MY_DOCUMENTS: string;
            USER_DATA: string;
        };
        static validateFileName(file_name: string): boolean;
        private _cd;
        constructor(path: string, type?: string);
        getFilesAndFolders(options?: {
            path?: string;
            mask?: string;
        }): (File | Folder)[];
        getFiles(options?: {
            path?: string;
            mask?: string;
        }): File[];
        getFile(file_name: string): File;
        getFileNames(options?: {
            path?: string;
            mask?: string;
        }): string[];
        getFolders(options?: {
            path?: string;
            mask?: string;
        }): Folder[];
        getFolder(folder_name: string): Folder;
        getFolderNames(options?: {
            path?: string;
            mask?: string;
        }): string[];
        exists(file_name: string): boolean;
        get(file_name: string): string;
        save(file_name: string, text: string): void;
        delete(file_name: string): boolean;
    }
}
declare namespace KIKAKU {
    class SettingManager {
        static VERSION: string;
        static AUTHOR: string;
        private _section;
        constructor(section: string);
        have(key: string): boolean;
        get(key: string, default_value: any): any;
        save(key: string, value: any): void;
        delete(key: string): void;
    }
}
declare namespace KIKAKU {
    interface UIParameterOptions {
        title?: boolean | string;
        helpTip?: string | string[];
        height?: number;
        filter?: string;
        stack?: boolean;
        callback?: Function | Function[];
        onDoubleClick?: Function | Function[];
        onChanging?: Function | Function[];
        onEnterKey?: Function | Function[];
        onActivate?: Function | Function[];
        onDeactivate?: Function | Function[];
    }
    interface UIAPI {
        (script_name: string, api_name: string, ...args: any[]): any;
        exists(script_name: string, api_name?: string): boolean;
        add(script_name: string, api_name: string, fn: Function, ctx?: any): void;
        remove(script_name: string): boolean;
    }
    interface UIBuilderOptions {
        version?: string;
        author?: string;
        url?: string;
        title?: string;
        resizeable?: boolean;
        numberOfScriptColumns?: number;
        titleWidth?: number;
        width?: number;
        help?: boolean;
        autoSave?: boolean;
        fileType?: string;
        api?: boolean | {
            get?: boolean;
            set?: boolean;
            execute?: boolean;
            enable?: boolean;
            disable?: boolean;
            replaceItems?: boolean;
            addItems?: boolean;
            removeItem?: boolean;
        };
    }
    class UIBuilder {
        static LIBRARY_NAME: string;
        static VERSION: string;
        static AUTHOR: string;
        static ALIAS: string;
        static PARAMETER_TYPE: {
            HEADING: string;
            SEPARATOR: string;
            SPACE: string;
            PANEL: string;
            PANEL_END: string;
            GROUP: string;
            GROUP_END: string;
            TEXT: string;
            TEXTS: string;
            TEXTAREA: string;
            TEXTAREAS: string;
            STATICTEXT: string;
            STATICTEXTS: string;
            NUMBER: string;
            NUMBERS: string;
            SLIDER: string;
            POINT: string;
            POINT3D: string;
            FILE: string;
            FOLDER: string;
            CHECKBOX: string;
            CHECKBOXES: string;
            RADIOBUTTON: string;
            COLOR: string;
            COLORS: string;
            POPUP: string;
            POPUPS: string;
            LISTBOX: string;
            LISTBOXES: string;
            SCRIPT: string;
            HELP: string;
        };
        private static PARAMETERS_KEY;
        private static SPACING_SIZE;
        private static MARGINS_SIZE;
        static API: UIAPI;
        private _ui;
        private _global;
        private _name;
        private _options;
        private _parameters;
        private _help;
        private _apis;
        private _layer;
        private _event_dispatcher;
        private _setting_manager;
        private _file_manager;
        private _built;
        constructor(global: Global | Panel | Window | string, name: string, options?: UIBuilderOptions);
        getName(): string;
        getVersion(): string;
        getAuthor(): string;
        getUrl(): string;
        getTitleWidth(): number;
        getWidth(): number;
        add(type: string, name: string, value?: any, options?: UIParameterOptions | Function): this;
        api(name: string, fn: Function): this;
        on(type: string, fn: Function): this;
        off(type: string, fn: Function): this;
        trigger(type: string): this;
        private validateParameter(name);
        get(name: string, index?: number): any;
        set(name: string, arg1?: any, arg2?: any): this;
        execute(name: string, undo?: boolean, ...args: any[]): any;
        enable(name: string, index?: number): this;
        disable(name: string, index?: number): this;
        visiblize(name: string, index: number): this;
        getItems(name: string, index?: number): string[] | string[][];
        replaceItems(name: string, items_or_index: string[] | string[][] | number, items2?: string[]): this;
        addItems(name: string, items_or_index: string | string[] | (string | string[])[] | number, items2?: string | string[]): this;
        removeItem(name: string, item_or_index: string | string[] | number, item2?: string): this;
        getSetting(key: string, default_value: any): any;
        saveSetting(key: string, value: any): this;
        deleteSetting(key: string): this;
        getFileNames(): string[];
        existsFile(filename: string): boolean;
        getFile(filename: string): any;
        saveFile(filename: string, data: any): this;
        deleteFile(filename: string): boolean;
        update(): void;
        close(): void;
        build(): void;
    }
}
declare namespace KIKAKU.Request {
    var VERSION: string;
    var ContentType: {
        JSON: string;
        FORM: string;
    };
    type PostOptions = {
        type: string;
        data: {
            [name: string]: any;
        };
    };
    type Response = {
        statusCode: number;
        reasonPhrase: string;
        headers: {
            [key: string]: string;
        };
        body: string;
    };
    type ResponseCallback = (response: Response) => void;
    function get(url: string, fn: ResponseCallback): void;
    function post(url: string, options: PostOptions, fn: ResponseCallback): void;
}
declare namespace KIKAKU.Unit {
    type Hooks = {
        before?: (utility?: Utility) => any;
        beforeEach?: (utility?: Utility) => any;
        afterEach?: (utility?: Utility) => any;
        after?: (utility?: Utility) => any;
    };
    type Tests = {
        [name: string]: (assert: Assert, utility?: Utility) => any;
    };
    function test(name: string, hooks_or_tests: Hooks | Tests, tests2?: Tests): boolean;
    class Assert {
        private _name;
        private _passed;
        private _total;
        constructor(name: string);
        getTotal(): number;
        getPassed(): number;
        isPassed(): boolean;
        private createMessage(message?);
        private check(result, suffix, message?);
        ok(result: boolean, message?: string): void;
        notOk(result: boolean, message?: string): void;
        private toSource(obj);
        equal(actual: any, expected: any, message?: string): void;
        notEqual(actual: any, expected: any, message?: string): void;
    }
    class Utility {
        private _width;
        private _height;
        private _items;
        private _layers;
        setSize(width: number, height: number): void;
        private checkItem(name);
        addCompItem(name: string, pixelAsplect?: number, duration?: number, frameRate?: number): CompItem;
        addFolderItem(name: string): FolderItem;
        addFootageItem(name: string, path: string): FootageItem;
        getItem(name: string): Item;
        removeItem(name: string): void;
        removeItems(): void;
        private checkLayer(comp_name, name);
        addAVLayer(comp_name: string, name: string, av_item_name: string, duration?: number): AVLayer;
        addNullLayer(comp_name: string, name: string, duration?: number): AVLayer;
        addSolidLayer(comp_name: string, name: string, color?: [number, number, number], duration?: number): AVLayer;
        addTextLayer(comp_name: string, name: string, source_text?: string | TextDocument): TextLayer;
        addBoxTextLayer(comp_name: string, name: string, size: [number, number], source_text?: string | TextDocument): TextLayer;
        addCameraLayer(comp_name: string, name: string, center_point?: [number, number]): CameraLayer;
        addLightLayer(comp_name: string, name: string, center_point?: [number, number]): LightLayer;
        addShapeLayer(comp_name: string, name: string): ShapeLayer;
        getLayer(name: string): Layer;
        removeLayer(name: string): void;
        removeLayers(): void;
        removeAll(): void;
    }
}
