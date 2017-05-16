declare namespace KIKAKU {
    var MAJOR_VERSION: number;
    var MINOR_VERSION: number;
    var PATCH_VERSION: number;
    var VERSION: string;
    var AUTHOR: string;
    var LICENSE: string;
    function checkVersion(version: string): boolean;
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
declare namespace KIKAKU.Utils {
    function isObject(arg: any): boolean;
    function isArray(arg: any): boolean;
    function isFunction(arg: any): arg is Function;
    function isString(arg: any): arg is string;
    function isNumber(arg: any): arg is number;
    function isBoolean(arg: any): arg is boolean;
    function isUndefined(arg: any): arg is void;
    function keys(obj: Object): string[];
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
declare namespace KIKAKU.Utils {
    function isFootageItem(item: Item): item is FootageItem;
    function isCompItem(item: Item): item is CompItem;
    function isAVItem(item: Item): item is AVItem;
    function isSolidItem(item: Item): item is FootageItem;
    function isFolderItem(item: Item): item is FolderItem;
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
    function isLayer(layer: Layer): layer is Layer;
    function isTextLayer(layer: Layer): layer is TextLayer;
    function isShapeLayer(layer: Layer): layer is ShapeLayer;
    function isAVLayer(layer: Layer, strict?: boolean): layer is AVLayer;
    function isCameraLayer(layer: Layer): layer is CameraLayer;
    function isLightLayer(layer: Layer): layer is LightLayer;
    function isNullLayer(layer: Layer): boolean;
    function isSolidLayer(layer: Layer): layer is AVLayer;
    function isFileLayer(layer: Layer): layer is AVLayer;
    function isStillLayer(layer: Layer): layer is AVLayer;
    function isCompLayer(layer: Layer): layer is AVLayer;
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
declare namespace KIKAKU.Utils._Impl {
    function not(fn: any, ctx?: any): () => boolean;
    function and(fns?: any, ...other: any[]): () => boolean;
    function or(fns?: any, ...other: any[]): () => boolean;
    function operate(lhs: any, op: any, rhs: any): boolean;
    function createOperatorFilter(fn: any, op: any, rhs: any): (obj: any) => boolean;
}
declare namespace KIKAKU.Utils {
    function isProperty(property: PropertyBase): property is Property;
    function isPropertyGroup(property: PropertyBase): property is PropertyGroup;
    function isHiddenProperty(property: PropertyBase): boolean;
    function getPropertyDimensions(property: Property): 0 | 1 | 2 | 4 | 3;
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
declare namespace KIKAKU.Utils.Comment {
    function get(layer_or_item: Layer | Item, key: string): any;
    function set(layer_or_item: Layer | Item, key: string, value: any): void;
    function remove(layer_or_item: Layer | Item, key: string): void;
}
declare namespace KIKAKU {
    class KArray<T> {
        protected _arr: T[];
        static from<U>(arr: U[]): KArray<U>;
        static of<U>(...items: U[]): KArray<U>;
        constructor(_arr: T[]);
        get(): T[];
        at(index: number): T;
        length(): number;
        copyWithin(target: number, start: number, end?: number): this;
        fill(value: T, start?: number, end?: number): this;
        pop(): T;
        push(...items: T[]): number;
        reverse(): this;
        shift(): T;
        sort(cmp?: (lhs: T, rhs: T) => number): this;
        splice(start?: number, deleteCount?: number, ...items: T[]): this;
        unshift(...items: T[]): number;
        concat(...items: T[]): KArray<T>;
        includes(searchElement: T, fromIndex?: number): boolean;
        join(sepqrator?: string): string;
        slice(start?: number, end?: number): KArray<T>;
        toSource(): string;
        toString(): string;
        toLocaleString(): string;
        indexOf(searchElement: T, fromIndex?: number): number;
        lastIndexOf(searchElement: T, fromIndex?: number): number;
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        entries(): KArray<[number, T]>;
        every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        keys(): KArray<number>;
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): KArray<U>;
        some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        filter<U extends T>(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): KArray<U>;
        find(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T;
        findIndex(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): number;
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue?: U): U;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue?: U): U;
        values(): KArray<T>;
    }
}
declare namespace KIKAKU {
    class KFile {
        protected _file: File;
        constructor(file?: File | string);
        get(): File;
        static fs(): string;
        static decode(uri: string): string;
        static encode(name: string): string;
        static isEncodingAvailable(name: string): boolean;
        static openDialog(prompt_?: string, filter?: string, multiSelect?: boolean): KFile | KArray<KFile>;
        static saveDialog(prompt_?: string, filter?: string): KFile;
        absoluteURI(): string;
        alias(): boolean;
        created(): Date;
        creator(): string;
        displayName(): string;
        encoding(encoding?: string): string;
        eof(): boolean;
        error(): string;
        exists(): boolean;
        fsName(): string;
        fullName(): string;
        hidden(hidden?: boolean): boolean;
        length(): number;
        lineFeed(): string;
        localizedName(): string;
        modified(): Date;
        name(): string;
        parent(): KFolder;
        path(): string;
        readonly(): boolean;
        relativeURI(): string;
        type(): string;
        changePath(path: string): boolean;
        close(): boolean;
        copy(target: string): boolean;
        createAlias(path?: string): boolean;
        execute(): boolean;
        getRelativeURI(basePath?: string): string;
        open(mode: string, type?: string, creator?: string): boolean;
        openDlg(prompt_?: string, filter?: string, multiSelect?: boolean): KFile | KArray<KFile>;
        read(chars?: number): string;
        readch(): string;
        readln(): string;
        remove(): boolean;
        rename(newName: string): boolean;
        resolve(): any;
        saveDlg(prompt_?: string, preset?: string): KFile;
        seek(pos: number, mode?: number): boolean;
        tell(): number;
        write(text: string, ...texts: string[]): any;
        writeln(text: string, ...texts: string[]): any;
    }
    class KFolder {
        protected _folder: Folder;
        constructor(folder?: Folder | string);
        get(): Folder;
        static appData(): KFolder;
        static appPackage(): KFolder;
        static commonFiles(): KFolder;
        static current(): KFolder;
        static desktop(): KFolder;
        static fs(): string;
        static myDocuments(): KFolder;
        static startup(): KFolder;
        static system(): KFolder;
        static temp(): KFolder;
        static trash(): KFolder;
        static userData(): KFolder;
        static decode(uri: string): string;
        static encode(name: string): string;
        static selectDialog(prompt?: string): KFile | KFolder;
        absoluteURI(): string;
        alias(): boolean;
        created(): Date;
        displayName(): string;
        error(): string;
        exists(): boolean;
        fsName(): string;
        fullName(): string;
        localizedName(): string;
        modified(): Date;
        name(): string;
        parent(): KFolder;
        path(): string;
        relativeURI(): string;
        changePath(path: string): boolean;
        create(): boolean;
        execute(): boolean;
        getFiles(mask?: string): KArray<KFile | KFolder>;
        getRelativeURI(basePath?: string): string;
        remove(): boolean;
        rename(newName: string): boolean;
        resolve(): KFolder;
        selectDlg(prompt_: string): KFile | KFolder;
    }
}
declare namespace KIKAKU {
    class KProject {
        get(): Project;
        file(): KFile;
        rootFolder(): KFolderItem;
        items(): KItemCollection;
        activeItem(): KItem<Item>;
        bitsPerChannel(bitsPerChannel?: number): number;
        transparencyGridThumbnails(transparencyGridThumbnails?: boolean): boolean;
        numItems(): number;
        selection(): KArray<KItem<Item>>;
        renderQueue(): RenderQueue;
        timeDisplayType(timeDisplayType?: TimeDisplayType): TimeDisplayType;
        footageTimecodeDisplayStartType(footageTimecodeDisplayStartType?: FootageTimecodeDisplayStartType): FootageTimecodeDisplayStartType;
        framesUseFeetFrames(framesUseFeetFrames?: boolean): boolean;
        feetFramesFilmType(feetFramesFilmType?: FeetFramesFilmType): FeetFramesFilmType;
        framesCountType(framesCountType?: FramesCountType): FramesCountType;
        displayStartFrame(displayStartFrame?: number): number;
        linearBlending(linearBlending?: boolean): boolean;
        xmpPacket(xmpPacket?: string): string;
        item(index: number): KItem<Item>;
        consolidateFootage(): number;
        removeUnusedFootage(): number;
        close(closeOptions: CloseOptions): boolean;
        save(file?: File | KFile): void;
        saveWithDialog(): boolean;
        importPlaceholder(name: string, width: number, height: number, frameRate: number, duration: number): PlaceholderItem;
        importFile(importOptions: ImportOptions): KFootageItem;
        importFileWithDialog(): KArray<KItem<Item>>;
        showWindow(doShow: boolean): void;
        autoFixExpressions(oldText: string, newText: string): void;
    }
}
declare namespace KIKAKU {
    class KFootageSource<T extends FootageSource> {
        protected _source: T;
        static isValid(source: any): boolean;
        constructor(_source: T);
        get(): T;
        isValid(): boolean;
        asSolid(): KSolidSource;
        ifSolid(fn: (source: KSolidSource) => any): this;
        asPlaceholder(): KPlaceholderSource;
        ifPlaceholder(fn: (source: KPlaceholderSource) => any): this;
        asFile(): KFileSource;
        ifFile(fn: (source: KFileSource) => any): this;
        hasAlpha(hasAlpha?: boolean): boolean;
        alphaMode(alphaMode?: AlphaMode): AlphaMode;
        premulColor(premulColor?: [number, number, number]): [number, number, number];
        invertAlpha(invertAlpha?: boolean): boolean;
        isStill(): boolean;
        fieldSeparationType(fieldSeparationType?: FieldSeparationType): FieldSeparationType;
        highQualityFieldSeparation(highQualityFieldSeparation?: boolean): boolean;
        removePulldown(removePulldown?: PulldownPhase): PulldownPhase;
        loop(loop?: number): number;
        nativeFrameRate(nativeFrameRate?: number): number;
        displayFrameRate(): number;
        conformFrameRate(conformFrameRate?: number): number;
        guessAlphaMode(): void;
        guessPulldown(method: PulldownMethod): void;
    }
    class KSolidSource extends KFootageSource<SolidSource> {
        static isValid(source: any): boolean;
        isValid(): boolean;
        color(color?: [number, number, number]): [number, number, number];
    }
    class KPlaceholderSource extends KFootageSource<PlaceholderSource> {
        static isValid(source: any): boolean;
        isValid(): boolean;
    }
    class KFileSource extends KFootageSource<FileSource> {
        static isValid(source: any): boolean;
        isValid(): boolean;
        file(): KFile;
        missingFootagePath(): string;
        reload(): void;
    }
}
declare namespace KIKAKU {
    class KItemCollection {
        protected _items: ItemCollection;
        constructor(_items: ItemCollection);
        length(): number;
        forEach(fn: (item: KItem<Item>, index: number) => void): void;
        at(index: number): KItem<Item>;
        addComp(name: string, width: number, height: number, pixelAspect: number, duration: number, frameRate: number): KCompItem;
        addFolder(name: string): KFolderItem;
    }
    class KItem<T extends Item> {
        protected _item: T;
        static isValid(item: any): boolean;
        constructor(_item: T);
        get(): T;
        isValid(): boolean;
        asFolder(): KFolderItem;
        ifFolder(fn: (item: KFolderItem) => any): this;
        asAV(): KAVItem<AVItem>;
        ifAV(fn: (item: KAVItem<AVItem>) => any): this;
        asComp(): KCompItem;
        ifComp(fn: (item: KCompItem) => any): this;
        asFootage(): KFootageItem;
        ifFootage(fn: (item: KFootageItem) => any): this;
        name(name?: string): string;
        comment(comment?: string): string;
        id(): number;
        parentFolder(parent?: FolderItem | KFolderItem): KFolderItem;
        selected(selected?: boolean): boolean;
        typeName(): string;
        label(label?: number): number;
        remove(): void;
    }
    class KFolderItem extends KItem<FolderItem> {
        static isValid(item: any): boolean;
        isValid(): boolean;
        items(): KItemCollection;
        numItems(): number;
        item(index: number): KItem<Item>;
        forEach(fn: (item: KItem<Item>, index: number) => void): void;
    }
    class KAVItem<T extends AVItem> extends KItem<T> {
        static isValid(item: any): boolean;
        isValid(): boolean;
        width(width?: number): number;
        height(height?: number): number;
        pixelAspect(pixelAspect?: number): number;
        frameRate(frameRate?: number): number;
        frameDuration(frameDuration?: number): number;
        duration(duration?: number): number;
        useProxy(useProxy?: boolean): boolean;
        proxySource(): KFootageSource<FootageSource>;
        time(time?: number): number;
        usedIn(): CompItem[];
        hasVideo(): boolean;
        hasAudio(): boolean;
        footageMissing(): boolean;
        setProxy(file: File | KFile): void;
        setProxyWithSequence(file: File | KFile, forceAlphabetical: boolean): void;
        setProxyWithSolid(color: [number, number, number], name: string, width: number, height: number, pixelAspect: number): void;
        setProxyWithPlaceholder(name: string, width: number, height: number, frameRate: number, duration: number): void;
        setProxyToNone(): void;
    }
    class KCompItem extends KAVItem<CompItem> {
        static isValid(item: any): boolean;
        isValid(): boolean;
        dropFrame(dropFrame?: boolean): boolean;
        workAreaStart(workAreaStart?: number): number;
        workAreaDuration(workAreaDuration?: number): number;
        numLayers(): number;
        hideShyLayers(hideShyLayers?: boolean): boolean;
        motionBlur(motionBlur?: boolean): boolean;
        draft3d(draft3d?: boolean): boolean;
        frameBlending(frameBlending?: boolean): boolean;
        preserveNestedFrameRate(preserveNestedFrameRate?: boolean): boolean;
        preserveNestedResolution(preserveNestedResolution?: boolean): boolean;
        bgColor(bgColor?: [number, number, number]): [number, number, number];
        activeCamera(): KCameraLayer;
        displayStartTime(displayStartTime?: number): number;
        resolutionFactor(resolutionFactor?: [number, number]): [number, number];
        shutterAngle(shutterAngle?: number): number;
        shutterPhase(shutterPhase?: number): number;
        motionBlurSamplesPerFrame(motionBlurSamplesPerFrame?: number): number;
        motionBlurAdaptiveSampleLimit(motionBlurAdaptiveSampleLimit?: number): number;
        layers(): KLayerCollection;
        selectedLayers(): KArray<KLayer<Layer>>;
        selectedProperties(): PropertyBase[];
        renderer(renderer?: string): string;
        renderers(): KArray<string>;
        duplicate(): KCompItem;
        layer(index_or_name: number | string): KLayer<Layer>;
        openInViewer(): Viewer;
        saveFrameToPng(time: number, file: File | KFile): void;
        forEach(fn: (layer: KLayer<Layer>, index: number) => void): void;
    }
    class KFootageItem extends KAVItem<FootageItem> {
        static isValid(item: any): boolean;
        isValid(): boolean;
        file(): KFile;
        mainSource(): KFootageSource<FootageSource>;
        replace(file: File | KFile): void;
        replaceWithSequence(file: File | KFile, forceAlphabetical: any): void;
        replaceWithPlaceholder(name: string, width: number, height: number, frameRate: number, duration: number): void;
        replaceWithSolid(color: [number, number, number], name: string, width: number, height: number, pixelAspect: number): void;
        openInViewer(): Viewer;
    }
}
declare namespace KIKAKU {
    class KLayerCollection {
        protected _layers: LayerCollection;
        constructor(_layers: LayerCollection);
        length(): number;
        at(index: number): KLayer<Layer>;
        forEach(fn: (layer: KLayer<Layer>, index: number) => void): void;
        add<T extends AVItem>(item: AVItem | KAVItem<T>, duration?: number): KAVLayer<AVLayer>;
        addNull(duration?: number): KAVLayer<AVLayer>;
        addSolid(color: [number, number, number], name: string, width: number, height: number, pixelAspect: number, duration?: number): KAVLayer<AVLayer>;
        addText(sourceText?: string | TextDocument): KTextLayer;
        addBoxText(size: [number, number], sourceText?: string | TextDocument): KTextLayer;
        addCamera(name: string, centerPoint: [number, number]): KCameraLayer;
        addLight(name: string, centerPoint: [number, number]): KLightLayer;
        addShape(name?: string): KShapeLayer;
        byName(name: string): KLayer<Layer>;
        precompose(layerIndices: number[], name: string, moveAllAttributes?: boolean): KCompItem;
    }
    class KLayer<T extends Layer> {
        protected _layer: T;
        static isValid(layer: any): boolean;
        constructor(_layer: T);
        get(): T;
        isValid(): boolean;
        asAV(): KAVLayer<AVLayer>;
        ifAV(fn: (layer: KAVLayer<AVLayer>) => any): this;
        ifAVBase(fn: (layer: KAVLayer<AVLayer>) => any): this;
        asShape(): KShapeLayer;
        ifShape(fn: (layer: KShapeLayer) => any): this;
        asText(): KTextLayer;
        ifText(fn: (layer: KTextLayer) => any): this;
        asLight(): KLightLayer;
        ifLight(fn: (layer: KLightLayer) => any): this;
        asCamera(): KCameraLayer;
        ifCamera(fn: (layer: KCameraLayer) => any): this;
        marker(): KMarkerProperty;
        transform(): KPropertyGroup<_TransformGroup>;
        anchorPoint(): KThreeDSpatialProperty;
        position(): KThreeDSpatialProperty;
        xPosition(): KOneDProperty;
        yPosition(): KOneDProperty;
        zPosition(): KOneDProperty;
        scale(): KThreeDProperty;
        orientation(): KThreeDSpatialProperty;
        rotation(): KOneDProperty;
        xRotation(): KOneDProperty;
        yRotation(): KOneDProperty;
        zRotation(): KOneDProperty;
        opacity(): KOneDProperty;
        index(): number;
        name(name?: string): string;
        parent<U extends Layer>(parent?: Layer | KLayer<U>): Layer;
        time(time?: number): number;
        startTime(startTime?: number): number;
        stretch(stretch?: number): number;
        inPoint(inPoint?: number): number;
        outPoint(outPoint?: number): number;
        enabled(enabled?: boolean): boolean;
        solo(solo?: boolean): boolean;
        shy(shy?: boolean): boolean;
        locked(locked?: boolean): boolean;
        hasVideo(): boolean;
        active(): boolean;
        nullLayer(): boolean;
        selectedProperties(): KArray<KPropertyBase<PropertyBase>>;
        comment(comment?: string): string;
        containingComp(): KCompItem;
        isNameSet(): boolean;
        matchName(): string;
        propertyDepth(): number;
        propertyType(): PropertyType;
        selected(selected?: boolean): boolean;
        numProperties(): number;
        remove(): void;
        moveToBeginning(): void;
        moveToEnd(): void;
        moveAfter<U extends Layer>(layer: Layer | KLayer<U>): void;
        moveBefore<U extends Layer>(layer: Layer | KLayer<U>): void;
        duplicate(): KLayer<Layer>;
        copyToComp(intoComp: CompItem | KCompItem): KLayer<Layer>;
        activeAtTime(time: number): boolean;
        setParentWithJump<U extends Layer>(newParent?: Layer | KLayer<U>): void;
        applyPreset(presetName: File | KFile): void;
        property(index_or_string: number | string): KPropertyBase<PropertyBase>;
        forEach(fn: (prop: KPropertyBase<PropertyBase>, index: number) => void): void;
    }
    class KAVLayer<T extends AVLayer> extends KLayer<T> {
        static isValid(layer: any): boolean;
        isValid(): boolean;
        timeRemap(): KOneDProperty;
        mask(): KMaskParade;
        effect(): KEffectParade;
        layerStyle(): KLayerStyles;
        geometryOption(): KPropertyGroup<_GeometryOptionsGroup>;
        materialOption(): KMaterialOptions;
        audio(): KPropertyGroup<_AudioGroup>;
        source(): KAVItem<AVItem>;
        isNameFromSource(): boolean;
        height(): number;
        width(): number;
        audioEnabled(audioEnabled?: boolean): boolean;
        motionBlur(motionBlur?: boolean): boolean;
        effectsActive(effectsActive?: boolean): boolean;
        adjustmentLayer(adjustmentLayer?: boolean): boolean;
        guideLayer(guideLayer?: boolean): boolean;
        threeDLayer(threeDLayer?: boolean): boolean;
        threeDPerChar(threeDPerChar?: boolean): boolean;
        environmentLayer(environmentLayer?: boolean): boolean;
        canSetCollapseTransformation(): boolean;
        collapseTransformation(collapseTransformation?: boolean): boolean;
        frameBlending(frameBlending?: boolean): boolean;
        frameBlendingType(frameBlendingType?: FrameBlendingType): FrameBlendingType;
        canSetTimeRemapEnabled(): boolean;
        timeRemapEnabled(timeRemapEnabled?: boolean): boolean;
        hasAudio(): boolean;
        audioActive(): boolean;
        blendingMode(blendingMode?: BlendingMode): BlendingMode;
        preserveTransparency(preserveTransparency?: boolean): boolean;
        trackMatteType(trackMatteType?: TrackMatteType): TrackMatteType;
        isTrackMatte(): boolean;
        hasTrackMatte(): boolean;
        quality(quality?: LayerQuality): LayerQuality;
        autoOrient(autoOrient?: AutoOrientType): AutoOrientType;
        samplingQuality(samplingQuality?: LayerSamplingQuality): LayerSamplingQuality;
        audioActiveAtTime(time: number): boolean;
        calculateTransformFromPoints(pointTopLeft: [number, number, number], pointTopRight: [number, number, number], pointBottomRight: [number, number, number]): Object;
        replaceSource<U extends AVItem>(newSource: AVItem | KAVItem<U>, fixExpressions: boolean): void;
        sourceRectAtTime(timeT: number, extents: boolean): {
            top: number;
            left: number;
            width: number;
            height: number;
        };
        openInViewer(): Viewer;
        sourcePointToComp(point: [number, number]): [number, number];
        compPointToSource(point: [number, number]): [number, number];
    }
    class KShapeLayer extends KAVLayer<ShapeLayer> {
        static isValid(layer: any): boolean;
        isValid(): boolean;
        contents(): KRootVectors;
    }
    class KTextLayer extends KAVLayer<TextLayer> {
        static isValid(layer: any): boolean;
        isValid(): boolean;
        text(): KTextProperties;
        sourceText(): KTextDocumentProperty;
    }
    class KCameraLayer extends KLayer<CameraLayer> {
        static isValid(layer: any): boolean;
        isValid(): boolean;
        cameraOption(): KCameraOptions;
    }
    class KLightLayer extends KLayer<LightLayer> {
        static isValid(layer: any): boolean;
        isValid(): boolean;
        lightOption(): KLightOptions;
    }
}
declare namespace KIKAKU {
    class KPropertyBase<T extends PropertyBase> {
        protected _prop: T;
        protected _parent: KPropertyGroup<PropertyGroup>;
        static isValid(prop: any): boolean;
        protected _name: string;
        constructor(_prop: T, _parent?: KPropertyGroup<PropertyGroup>);
        get(): T;
        isValid(): boolean;
        validate(): void;
        asPropertyGroup(): KPropertyGroup<PropertyGroup>;
        ifPropertyGroup(fn: (property: KPropertyGroup<PropertyGroup>) => any): this;
        asMaskPropertyGroup(): KMaskPropertyGroup;
        ifMaskPropertyGroup(fn: (property: KMaskPropertyGroup) => any): this;
        asProperty(): KProperty<PropertyValue>;
        ifProperty(fn: (property: KProperty<PropertyValue>) => any): this;
        name(name?: string): string;
        matchName(): string;
        propertyIndex(): number;
        propertyDepth(): number;
        propertyType(): PropertyType;
        parentProperty(): KPropertyGroup<PropertyGroup>;
        isModified(): boolean;
        canSetEnabled(): boolean;
        enabled(enabled?: boolean): boolean;
        active(): boolean;
        elided(): boolean;
        isEffect(): boolean;
        isMask(): boolean;
        selected(selected?: boolean): boolean;
        hidden(): boolean;
        propertyGroup(countUp?: number): KPropertyGroup<PropertyGroup>;
        remove(): void;
        moveTo(newIndex: number): void;
        duplicate(): KPropertyBase<PropertyBase>;
    }
    class KPropertyGroup<T extends PropertyGroup> extends KPropertyBase<T> {
        static isValid(prop: any): boolean;
        isValid(): boolean;
        numProperties(): number;
        property(index_or_name: number | string): KPropertyBase<PropertyBase>;
        propertyAsProperty(index_or_name: number | string): KProperty<PropertyValue>;
        propertyAsPropertyGroup(index_or_name: number | string): KPropertyGroup<PropertyGroup>;
        canAddProperty(name: string): boolean;
        addProperty(name: string): KPropertyBase<PropertyBase>;
        addPropertyAsProperty(name: string): KProperty<PropertyValue>;
        addPropertyAsPropertyGroup(name: string): KPropertyGroup<PropertyGroup>;
        forEach(fn: (prop: KPropertyBase<PropertyBase>, index: number) => void): void;
    }
    class KMaskPropertyGroup extends KPropertyGroup<MaskPropertyGroup> {
        static isValid(prop: any): boolean;
        isValid(): boolean;
        maskPath(): KShapeProperty;
        maskFeather(): KTwoDProperty;
        maskOpacity(): KOneDProperty;
        maskExpansion(): KOneDProperty;
        maskMode(maskMode?: MaskMode): MaskMode;
        inverted(inverted?: boolean): boolean;
        rotoBezier(rotoBezier?: boolean): boolean;
        maskMotionBlur(maskMotionBlur?: MaskMotionBlur): MaskMotionBlur;
        locked(locked?: boolean): boolean;
        color(color?: [number, number, number]): [number, number, number];
        maskFeatherFalloff(maskFeatherFalloff?: MaskFeatherFalloff): MaskFeatherFalloff;
    }
    class KProperty<T extends PropertyValue> extends KPropertyBase<Property> {
        static isValid(prop: any): boolean;
        isValid(): boolean;
        asNoValue(): KNoValueProperty;
        asThreeDSpatial(): KThreeDSpatialProperty;
        asThreeD(): KThreeDProperty;
        asTwoDSpatial(): KTwoDSpatialProperty;
        asTwoD(): KTwoDProperty;
        asOneD(): KOneDProperty;
        asColor(): KColorProperty;
        asCustomValue(): KCustomValueProperty;
        asMarker(): KMarkerProperty;
        asLayerIndex(): KLayerIndexProperty;
        asMaskIndex(): KMaskIndexProperty;
        asShape(): KShapeProperty;
        asTextDocument(): KTextDocumentProperty;
        propertyValueType(): PropertyValueType;
        value(): T;
        hasMin(): boolean;
        hasMax(): boolean;
        minValue(): number;
        maxValue(): number;
        isSpatial(): boolean;
        canVaryOverTime(): boolean;
        isTimeVarying(): boolean;
        numKeys(): number;
        unitsText(): string;
        expression(expression?: string): string;
        canSetExpression(): boolean;
        expressionEnabled(expressionEnabled?: boolean): boolean;
        expressionError(): string;
        selectedKeys(): KArray<number>;
        propertyIndex(): number;
        dimensionsSeparated(dimensionsSeparated?: boolean): boolean;
        isSeparationFollower(): boolean;
        isSeparationLeader(): boolean;
        separationDimension(): number;
        separationLeader(): Property;
        valueAtTime(time: number, preExpression: boolean): T;
        setValue(value: T): void;
        setValueAtTime(time: number, newValue: T): void;
        setValuesAtTimes(times: number[], newValues: T[]): void;
        setValueAtKey(keyIndex: number, newValue: T): void;
        nearestKeyIndex(time: number): number;
        keyTime(keyIndex_or_markerComment: number | string): number;
        keyValue(keyIndex_or_markerComment: number | string): T;
        addKey(time: number): number;
        removeKey(keyIndex: number): void;
        isInterpolationTypeValid(type: KeyframeInterpolationType): boolean;
        setInterpolationTypeAtKey(keyIndex: number, inType: KeyframeInterpolationType, outType: KeyframeInterpolationType): void;
        keyInInterpolationType(keyIndex: number): KeyframeInterpolationType;
        keyOutInterpolationType(keyIndex: number): KeyframeInterpolationType;
        setSpatialTangentsAtKey(keyIndex: number, inTangent: [number, number] | [number, number, number], outTangent: [number, number] | [number, number, number]): void;
        keyInSpatialTangent(keyIndex: number): [number, number] | [number, number, number];
        keyOutSpatialTangent(keyIndex: number): [number, number] | [number, number, number];
        setTemporalEaseAtKey(keyIndex: number, inTemporalEase: [KeyframeEase] | [KeyframeEase, KeyframeEase] | [KeyframeEase, KeyframeEase, KeyframeEase], outTemporalEase: [KeyframeEase] | [KeyframeEase, KeyframeEase] | [KeyframeEase, KeyframeEase, KeyframeEase]): void;
        keyInTemporalEase(keyIndex: number): KArray<KeyframeEase>;
        keyOutTemporalEase(keyIndex: number): KArray<KeyframeEase>;
        setTemporalContinuousAtKey(keyIndex: number, newVal: boolean): void;
        keyTemporalContinuous(keyIndex: number): boolean;
        setTemporalAutoBezierAtKey(keyIndex: number, newVal: boolean): void;
        keyTemporalAutoBezier(keyIndex: number): boolean;
        setSpatialContinuousAtKey(keyIndex: number, newVal: boolean): void;
        keySpatialContinuous(keyIndex: number): boolean;
        setSpatialAutoBezierAtKey(keyIndex: number, newVal: boolean): void;
        keySpatialAutoBezier(keyIndex: number): boolean;
        setRovingAtKey(keyIndex: number, newVal: boolean): void;
        keyRoving(keyIndex: number): boolean;
        setSelectedAtKey(keyIndex: number, onOff: boolean): void;
        keySelected(keyIndex: number): boolean;
        getSeparationFollower(dim: number): KProperty<PropertyValue>;
    }
    class KNoValueProperty extends KProperty<void> {
        isValid(): boolean;
    }
    class KThreeDSpatialProperty extends KProperty<[number, number] | [number, number, number]> {
        isValid(): boolean;
    }
    class KThreeDProperty extends KProperty<[number, number] | [number, number, number]> {
        isValid(): boolean;
    }
    class KTwoDSpatialProperty extends KProperty<[number, number]> {
        isValid(): boolean;
    }
    class KTwoDProperty extends KProperty<[number, number]> {
        isValid(): boolean;
    }
    class KOneDProperty extends KProperty<number | boolean> {
        isValid(): boolean;
    }
    class KColorProperty extends KProperty<[number, number, number] | [number, number, number, number]> {
        isValid(): boolean;
    }
    class KCustomValueProperty extends KProperty<void> {
        isValid(): boolean;
    }
    class KMarkerProperty extends KProperty<MarkerValue> {
        isValid(): boolean;
    }
    class KLayerIndexProperty extends KProperty<number> {
        isValid(): boolean;
    }
    class KMaskIndexProperty extends KProperty<number> {
        isValid(): boolean;
    }
    class KShapeProperty extends KProperty<Shape> {
        isValid(): boolean;
    }
    class KTextDocumentProperty extends KProperty<TextDocument> {
        isValid(): boolean;
    }
    class KMaskParade extends KPropertyGroup<PropertyGroup> {
        addMaskAtom(name?: string): KMaskPropertyGroup;
    }
    class KEffectParade extends KPropertyGroup<PropertyGroup> {
        addProperty(name_or_matchname: string): KEffect;
        addPropertyAsPropertyGroup(name: string): KEffect;
    }
    class KEffect extends KPropertyGroup<PropertyGroup> {
        property(index_or_name: number | string): KProperty<PropertyValue>;
    }
    class KLayerStyles extends KPropertyGroup<PropertyGroup> {
        private _layer;
        constructor(prop: PropertyGroup, parent?: KPropertyGroup<PropertyGroup>);
        blendingOptions(): KLayerStylesBlendingOptions;
        dropShadow(): KLayerStylesDropShadow;
        innerShadow(): KLayerStylesInnerShadow;
        outerGlow(): KLayerStylesOuterGlow;
        innerGlow(): KLayerStylesInnerGlow;
        bevelAndEmboss(): KLayerStylesBevelAndEmboss;
        satin(): KLayerStylesSatin;
        colorOverlay(): KLayerStylesColorOverlay;
        gradientOverlay(): KLayerStylesGradientOverlay;
        stroke(): KLayerStylesStroke;
        addDropShadow(): KLayerStylesDropShadow;
        addInnerShadow(): KLayerStylesInnerShadow;
        addOuterGlow(): KLayerStylesOuterGlow;
        addInnerGlow(): KLayerStylesInnerGlow;
        addBevelAndEmboss(): KLayerStylesBevelAndEmboss;
        addSatin(): KLayerStylesSatin;
        addColorOverlay(): KLayerStylesColorOverlay;
        addGradientOverlay(): KLayerStylesGradientOverlay;
        addStroke(): KLayerStylesStroke;
        private doCommand(command_id);
    }
    class KLayerStylesBlendingOptions extends KPropertyGroup<PropertyGroup> {
        globalLightAngle(): KOneDProperty;
        globalLightAltitude(): KOneDProperty;
        advancedBlending(): KLayerStylesAdvancedBlending;
    }
    class KLayerStylesAdvancedBlending extends KPropertyGroup<PropertyGroup> {
        fillOpacity(): KOneDProperty;
        red(): KOneDProperty;
        green(): KOneDProperty;
        blue(): KOneDProperty;
        blendInteriorStylesAsGroup(): KOneDProperty;
        useBlendRangesFromSource(): KOneDProperty;
    }
    class KLayerStylesDropShadow extends KPropertyGroup<PropertyGroup> {
        blendMode(): KOneDProperty;
        color(): KColorProperty;
        opacity(): KOneDProperty;
        useGlobalLight(): KOneDProperty;
        angle(): KOneDProperty;
        distance(): KOneDProperty;
        spread(): KOneDProperty;
        size(): KOneDProperty;
        noise(): KOneDProperty;
        layerKnocksOutDropShadow(): KOneDProperty;
    }
    class KLayerStylesInnerShadow extends KPropertyGroup<PropertyGroup> {
        blendMode(): KOneDProperty;
        color(): KColorProperty;
        opacity(): KOneDProperty;
        useGlobalLight(): KOneDProperty;
        angle(): KOneDProperty;
        distance(): KOneDProperty;
        choke(): KOneDProperty;
        size(): KOneDProperty;
        noise(): KOneDProperty;
    }
    class KLayerStylesOuterGlow extends KPropertyGroup<PropertyGroup> {
        blendMode(): KOneDProperty;
        opacity(): KOneDProperty;
        noise(): KOneDProperty;
        colorType(): KOneDProperty;
        color(): KColorProperty;
        colors(): KCustomValueProperty;
        gradientSmoothness(): KOneDProperty;
        technique(): KOneDProperty;
        spread(): KOneDProperty;
        size(): KOneDProperty;
        range(): KOneDProperty;
        jitter(): KOneDProperty;
    }
    class KLayerStylesInnerGlow extends KPropertyGroup<PropertyGroup> {
        blendMode(): KOneDProperty;
        opacity(): KOneDProperty;
        noise(): KOneDProperty;
        colorType(): KOneDProperty;
        color(): KColorProperty;
        colors(): KCustomValueProperty;
        gradientSmoothness(): KOneDProperty;
        technique(): KOneDProperty;
        source(): KOneDProperty;
        choke(): KOneDProperty;
        size(): KOneDProperty;
        range(): KOneDProperty;
        jitter(): KOneDProperty;
    }
    class KLayerStylesBevelAndEmboss extends KPropertyGroup<PropertyGroup> {
        style(): KOneDProperty;
        technique(): KOneDProperty;
        depth(): KOneDProperty;
        direction(): KOneDProperty;
        size(): KOneDProperty;
        soften(): KOneDProperty;
        useGlobalLight(): KOneDProperty;
        angle(): KOneDProperty;
        altitude(): KOneDProperty;
        highlightMode(): KOneDProperty;
        highlightColor(): KColorProperty;
        highlightOpacity(): KOneDProperty;
        shadowMode(): KOneDProperty;
        shadowColor(): KColorProperty;
        shadowOpacity(): KOneDProperty;
    }
    class KLayerStylesSatin extends KPropertyGroup<PropertyGroup> {
        blendMode(): KOneDProperty;
        color(): KColorProperty;
        opacity(): KOneDProperty;
        angle(): KOneDProperty;
        distance(): KOneDProperty;
        size(): KOneDProperty;
        invert(): KOneDProperty;
    }
    class KLayerStylesColorOverlay extends KPropertyGroup<PropertyGroup> {
        blendMode(): KOneDProperty;
        color(): KColorProperty;
        opacity(): KOneDProperty;
    }
    class KLayerStylesGradientOverlay extends KPropertyGroup<PropertyGroup> {
        blendMode(): KOneDProperty;
        opacity(): KOneDProperty;
        colors(): KCustomValueProperty;
        gradientSmoothness(): KOneDProperty;
        angle(): KOneDProperty;
        style(): KOneDProperty;
        reverse(): KOneDProperty;
        alignWithLayer(): KOneDProperty;
        scale(): KOneDProperty;
        offset(): KOneDProperty;
    }
    class KLayerStylesStroke extends KPropertyGroup<PropertyGroup> {
        blendMode(): KOneDProperty;
        color(): KColorProperty;
        size(): KOneDProperty;
        opacity(): KOneDProperty;
        position(): KOneDProperty;
    }
    class KTextProperties extends KPropertyGroup<PropertyGroup> {
        sourceText(): KTextDocumentProperty;
        pathOptions(): KTextPathOptions;
        moreOptions(): KTextMoreOptions;
        animators(): KTextAnimators;
    }
    class KTextPathOptions extends KPropertyGroup<_TextPathOptions> {
        path(): KMaskIndexProperty;
    }
    class KTextMoreOptions extends KPropertyGroup<_TextMoreOptions> {
        anchorPointGrouping(): KOneDProperty;
        groupingAlignment(): KTwoDProperty;
        fillAndStroke(): KOneDProperty;
        interCharacterBlending(): KOneDProperty;
    }
    class KTextAnimators extends KPropertyGroup<PropertyGroup> {
        addAnimator(name?: string): KTextAnimator;
    }
    class KTextAnimator extends KPropertyGroup<PropertyGroup> {
        properties(): KTextAnimatorProperties;
        selectors(): KTextSelectors;
    }
    class KTextAnimatorProperties extends KPropertyGroup<PropertyGroup> {
        anchorPoint(): KThreeDSpatialProperty;
        position(): KThreeDSpatialProperty;
        scale(): KThreeDProperty;
        skew(): KOneDProperty;
        skewAxis(): KOneDProperty;
        rotation(): KOneDProperty;
        opacity(): KOneDProperty;
        fillOpacity(): KOneDProperty;
        fillColor(): KColorProperty;
        fillHue(): KOneDProperty;
        fillSaturation(): KOneDProperty;
        fillBrightness(): KOneDProperty;
        strokeOpacity(): KOneDProperty;
        strokeColor(): KColorProperty;
        strokeHue(): KOneDProperty;
        strokeSaturation(): KOneDProperty;
        strokeBrightness(): KOneDProperty;
        strokeWidth(): KOneDProperty;
        lineAnchor(): KOneDProperty;
        trackingType(): KOneDProperty;
        trackingAmount(): KOneDProperty;
        characterAlignment(): KOneDProperty;
        characterRange(): KOneDProperty;
        characterValue(): KOneDProperty;
        characterOffset(): KOneDProperty;
        lineSpacing(): KTwoDProperty;
        blur(): KTwoDProperty;
        addAnchorPoint(): KThreeDSpatialProperty;
        addPosition(): KThreeDSpatialProperty;
        addScale(): KThreeDSpatialProperty;
        addSkew(): KThreeDSpatialProperty;
        addSkewAxis(): KThreeDSpatialProperty;
        addRotation(): KThreeDSpatialProperty;
        addOpacity(): KThreeDSpatialProperty;
        addFillOpacity(): KOneDProperty;
        addFillColor(): KColorProperty;
        addFillHue(): KOneDProperty;
        addFillSaturation(): KOneDProperty;
        addFillBrightness(): KOneDProperty;
        addStrokeOpacity(): KOneDProperty;
        addStrokeColor(): KColorProperty;
        addStrokeHue(): KOneDProperty;
        addStrokeSaturation(): KOneDProperty;
        addStrokeBrightness(): KOneDProperty;
        addStrokeWidth(): KOneDProperty;
        addLineAnchor(): KOneDProperty;
        addTrackingType(): KOneDProperty;
        addTrackingAmount(): KOneDProperty;
        addCharacterAlignment(): KOneDProperty;
        addCharacterRange(): KOneDProperty;
        addCharacterValue(): KOneDProperty;
        addCharacterOffset(): KOneDProperty;
        addLineSpacing(): KTwoDProperty;
        addBlur(): KTwoDProperty;
    }
    class KTextSelectors extends KPropertyGroup<PropertyGroup> {
        addRangeSelector(name?: string): KTextRangeSelector;
        addWigglySelector(name?: string): KWigglySelector;
        addExpressionSelector(name?: string): KTextExpressionSelector;
    }
    class KTextRangeSelector extends KPropertyGroup<PropertyGroup> {
        start(): KOneDProperty;
        end(): KOneDProperty;
        offset(): KOneDProperty;
        advanced(): KTextRangeAdvanced;
    }
    class KTextRangeAdvanced extends KPropertyGroup<PropertyGroup> {
        units(): KOneDProperty;
        basedOn(): KOneDProperty;
        mode(): KOneDProperty;
        amount(): KOneDProperty;
        shape(): KOneDProperty;
        smoothness(): KOneDProperty;
        easeHigh(): KOneDProperty;
        easeLow(): KOneDProperty;
        randomizeOrder(): KOneDProperty;
    }
    class KWigglySelector extends KPropertyGroup<PropertyGroup> {
        mode(): KOneDProperty;
        maxAmount(): KOneDProperty;
        minAmount(): KOneDProperty;
        basedOn(): KOneDProperty;
        wigglesPerSecond(): KOneDProperty;
        correlation(): KOneDProperty;
        temporalPhase(): KOneDProperty;
        spatialPhase(): KOneDProperty;
        lockDimensions(): KOneDProperty;
        randomSeed(): KOneDProperty;
    }
    class KTextExpressionSelector extends KPropertyGroup<PropertyGroup> {
        basedOn(): KOneDProperty;
        amount(): KThreeDProperty;
    }
    class KVectorsGroup extends KPropertyGroup<PropertyGroup> {
        addGroup(name?: string): KVectorGroup;
        addRectangle(name?: string): KVectorRect;
        addEllipse(name?: string): KVectorEllipse;
        addPolystar(name?: string): KVectorPolystar;
        addPath(name?: string): KVectorPath;
        addFill(name?: string): KVectorFill;
        addStroke(name?: string): KVectorStroke;
        addGradientFill(name?: string): KVectorGradientFill;
        addGradientStroke(name?: string): KVectorGradientStroke;
        addMergePaths(name?: string): KVectorMergePaths;
        addOffsetPaths(name?: string): KVectorOffsetPaths;
        addPuckerAndBloat(name?: string): KVectorPuckerAndBloat;
        addRepeater(name?: string): KVectorRepeater;
        addRoundCorners(name?: string): KVectorRoundCorners;
        addTrimPaths(name?: string): KVectorTrimPaths;
        addTwist(name?: string): KVectorTwist;
        addWigglePaths(name?: string): KVectorWigglePaths;
        addWiggleTransform(name?: string): KVectorWiggler;
        addZigzag(name?: string): KVectorZigzag;
    }
    class KRootVectors extends KVectorsGroup {
    }
    class KVectorGroup extends KPropertyGroup<PropertyGroup> {
        vectors(): KVectorsGroup;
        transform(): KVectorTransform;
    }
    class KVectorTransform extends KPropertyGroup<PropertyGroup> {
        anchorPoint(): KTwoDSpatialProperty;
        position(): KTwoDSpatialProperty;
        scale(): KTwoDProperty;
        skew(): KOneDProperty;
        skewAxis(): KOneDProperty;
        rotation(): KOneDProperty;
        opacity(): KOneDProperty;
    }
    class KVectorRect extends KPropertyGroup<PropertyGroup> {
        size(): KTwoDProperty;
        position(): KTwoDSpatialProperty;
        roundness(): KOneDProperty;
    }
    class KVectorEllipse extends KPropertyGroup<PropertyGroup> {
        size(): KTwoDProperty;
        position(): KTwoDSpatialProperty;
    }
    class KVectorPolystar extends KPropertyGroup<PropertyGroup> {
        type(): KOneDProperty;
        points(): KOneDProperty;
        position(): KTwoDSpatialProperty;
        rotation(): KOneDProperty;
        innerRadius(): KOneDProperty;
        outerRadius(): KOneDProperty;
        innerRoundness(): KOneDProperty;
        outerRoundness(): KOneDProperty;
    }
    class KVectorPath extends KPropertyGroup<PropertyGroup> {
        path(): KShapeProperty;
    }
    class KVectorFill extends KPropertyGroup<PropertyGroup> {
        composite(): KOneDProperty;
        fillRule(): KOneDProperty;
        color(): KColorProperty;
        opacity(): KOneDProperty;
    }
    class KVectorStroke extends KPropertyGroup<PropertyGroup> {
        composite(): KOneDProperty;
        color(): KColorProperty;
        opacity(): KOneDProperty;
        strokeWidth(): KOneDProperty;
        lineCap(): KOneDProperty;
        lineJoin(): KOneDProperty;
        miterLimit(): KOneDProperty;
    }
    class KVectorGradientFill extends KPropertyGroup<PropertyGroup> {
        composite(): KOneDProperty;
        fillRule(): KOneDProperty;
        type(): KOneDProperty;
        startPoint(): KTwoDSpatialProperty;
        endPoint(): KTwoDSpatialProperty;
        colors(): KCustomValueProperty;
        opacity(): KOneDProperty;
    }
    class KVectorGradientStroke extends KPropertyGroup<PropertyGroup> {
        composite(): KOneDProperty;
        type(): KOneDProperty;
        startPoint(): KTwoDSpatialProperty;
        endPoint(): KTwoDSpatialProperty;
        colors(): KCustomValueProperty;
        opacity(): KOneDProperty;
        strokeWidth(): KOneDProperty;
        lineCap(): KOneDProperty;
        lineJoin(): KOneDProperty;
        miterLimit(): KOneDProperty;
    }
    class KVectorMergePaths extends KPropertyGroup<PropertyGroup> {
        mode(): KOneDProperty;
    }
    class KVectorOffsetPaths extends KPropertyGroup<PropertyGroup> {
        amount(): KOneDProperty;
        lineJoin(): KOneDProperty;
        miterLimit(): KOneDProperty;
    }
    class KVectorPuckerAndBloat extends KPropertyGroup<PropertyGroup> {
        amount(): KOneDProperty;
    }
    class KVectorRepeater extends KPropertyGroup<PropertyGroup> {
        copies(): KOneDProperty;
        offset(): KOneDProperty;
        transform(): KVectorRepeaterTransform;
    }
    class KVectorRepeaterTransform extends KPropertyGroup<PropertyGroup> {
        anchorPoint(): KTwoDSpatialProperty;
        position(): KTwoDSpatialProperty;
        scale(): KTwoDProperty;
        rotation(): KOneDProperty;
        startOpacity(): KOneDProperty;
        endOpacity(): KOneDProperty;
    }
    class KVectorRoundCorners extends KPropertyGroup<PropertyGroup> {
        radius(): KOneDProperty;
    }
    class KVectorTrimPaths extends KPropertyGroup<PropertyGroup> {
        start(): KOneDProperty;
        end(): KOneDProperty;
        offset(): KOneDProperty;
        trimMultipleShapes(): KOneDProperty;
    }
    class KVectorTwist extends KPropertyGroup<PropertyGroup> {
        angle(): KOneDProperty;
        center(): KTwoDSpatialProperty;
    }
    class KVectorWigglePaths extends KPropertyGroup<PropertyGroup> {
        size(): KOneDProperty;
        detail(): KOneDProperty;
        points(): KOneDProperty;
        wigglesPerSecond(): KOneDProperty;
        correlation(): KOneDProperty;
        temporalPhase(): KOneDProperty;
        spatialPhase(): KOneDProperty;
        randomSeed(): KOneDProperty;
    }
    class KVectorWiggler extends KPropertyGroup<PropertyGroup> {
        wigglesPerSecond(): KOneDProperty;
        correlation(): KOneDProperty;
        temporalPhase(): KOneDProperty;
        spatialPhase(): KOneDProperty;
        randomSeed(): KOneDProperty;
        transform(): KVectorWigglerTransform;
    }
    class KVectorWigglerTransform extends KPropertyGroup<PropertyGroup> {
        anchorPoint(): KTwoDSpatialProperty;
        position(): KTwoDSpatialProperty;
        scale(): KTwoDProperty;
        rotation(): KOneDProperty;
    }
    class KVectorZigzag extends KPropertyGroup<PropertyGroup> {
        size(): KOneDProperty;
        ridgesPerSegment(): KOneDProperty;
        points(): KOneDProperty;
    }
    class KMaterialOptions extends KPropertyGroup<PropertyGroup> {
        castsShadows(): KOneDProperty;
        lightTransmission(): KOneDProperty;
        acceptsShadows(): KOneDProperty;
        acceptsLights(): KOneDProperty;
        ambient(): KOneDProperty;
        diffuse(): KOneDProperty;
        specularIntensity(): KOneDProperty;
        specularShininess(): KOneDProperty;
        metal(): KOneDProperty;
    }
    class KCameraOptions extends KPropertyGroup<PropertyGroup> {
        zoom(): KOneDProperty;
        depthOfField(): KOneDProperty;
        focusDistance(): KOneDProperty;
        aperture(): KOneDProperty;
        blurLevel(): KOneDProperty;
        irisShape(): KOneDProperty;
        irisRotation(): KOneDProperty;
        irisRoundness(): KOneDProperty;
        irisAspectRatio(): KOneDProperty;
        irisDiffractionFringe(): KOneDProperty;
        highlightGain(): KOneDProperty;
        highlightThreshold(): KOneDProperty;
        highlightSaturation(): KOneDProperty;
    }
    class KLightOptions extends KPropertyGroup<PropertyGroup> {
        intensity(): KOneDProperty;
        color(): KColorProperty;
        coneAngle(): KOneDProperty;
        coneFeather(): KOneDProperty;
        falloff(): KOneDProperty;
        radius(): KOneDProperty;
        falloffDistance(): KOneDProperty;
        castsShadows(): KOneDProperty;
        shadowDarkness(): KOneDProperty;
        shadowDiffusion(): KOneDProperty;
    }
}
declare namespace KIKAKU {
    class EventDispatcher {
        private _listners;
        addEventListener(type: string, fn: Function, ctx?: any): void;
        removeEventListener(type: string, fn: Function | string, ctx?: any): void;
        dispatchEvent(type: string, ...args: any[]): void;
    }
}
declare namespace KIKAKU {
    class FileManager {
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
declare namespace KIKAKU.Request {
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
declare namespace KIKAKU {
    class SettingManager {
        private _section;
        constructor(section: string);
        have(key: string): boolean;
        get(key: string, default_value: any): any;
        save(key: string, value: any): void;
        delete(key: string): void;
    }
}
declare namespace KIKAKU.Timer {
    type TimeoutID = string;
    function setTimeout(fn: Function, delay: number, ctx?: any): TimeoutID;
    function clearTimeout(id: TimeoutID): void;
    function execute(id: TimeoutID): void;
    function debounce(fn: Function, interval: number, ctx?: any): () => void;
}
declare namespace KIKAKU {
    interface UIParameterOptions {
        title?: boolean | string;
        helpTip?: string | string[];
        height?: number;
        filter?: string;
        stack?: boolean;
        autoSave?: boolean;
        callback?: Function | Function[];
        onDoubleClick?: Function | Function[];
        onChanging?: Function | Function[];
        onEnterKey?: Function | Function[];
        onActivate?: Function | Function[];
        onDeactivate?: Function | Function[];
    }
    type FileType = 'txt' | 'json';
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
        fileType?: FileType;
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
            STATICTEXTAREA: string;
            STATICTEXTAREAS: string;
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
        static EVENT_TYPE: {
            INIT: string;
            MOUSEDOWN: string;
            MOUSEUP: string;
            MOUSEMOVE: string;
            MOUSEOVER: string;
            MOUSEOUT: string;
            CLOSE: string;
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
        private _events;
        private _help;
        private _apis;
        private _layer;
        private _event_dispatcher;
        private _setting_manager;
        private _file_manager;
        private _built;
        constructor(global: Global | Panel | Window | 'dialog' | 'palette', name: string, options?: UIBuilderOptions);
        getName(): string;
        getVersion(): string;
        getAuthor(): string;
        getUrl(): string;
        getTitleWidth(): number;
        getWidth(): number;
        add(type: string, name: string, value?: any, options?: UIParameterOptions | Function): this;
        addHeading(name: string, title?: string, options?: {
            title?: string;
            helpTip?: string;
            autoSave?: boolean;
        }): this;
        addSeparator(name: string): this;
        addSpace(name: string, height?: number): this;
        addPanel(name: string, title?: string, options?: {
            stack?: boolean;
            autoSave?: boolean;
        }): this;
        addPanelEnd(name: string): this;
        addGroup(name: string): this;
        addGroupEnd(name: string): this;
        addText(name: string, initial_value?: string, options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onChanging?: Function;
            onEnterKey?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addTexts(name: string, initial_values?: string[], options?: Function | {
            title?: boolean | string;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
            onChanging?: Function | Function[];
            onEnterKey?: Function | Function[];
            onActivate?: Function | Function[];
            onDeactivate?: Function | Function[];
        }): this;
        addTextarea(name: string, initial_value?: string, options?: Function | {
            title?: boolean | string;
            height?: number;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onChanging?: Function;
            onEnterKey?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addTextareas(name: string, initial_values?: string[], options?: Function | {
            title?: boolean | string;
            height?: number;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
            onChanging?: Function | Function[];
            onEnterKey?: Function | Function[];
            onActivate?: Function | Function[];
            onDeactivate?: Function | Function[];
        }): this;
        addStatictext(name: string, initial_value?: string, options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
        }): this;
        addStatictexts(name: string, initial_values?: string[], options?: Function | {
            title?: boolean | string;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
        }): this;
        addStatictextArea(name: string, initial_value?: string, options?: Function | {
            title?: boolean | string;
            height?: number;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
        }): this;
        addStatictextAreas(name: string, initial_values?: string[], options?: Function | {
            title?: boolean | string;
            height?: number;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
        }): this;
        addNumber(name: string, initial_value?: number | {
            value?: number;
            minvalue?: number;
            maxvalue?: number;
        }, options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onEnterKey?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addNumbers(name: string, initial_values?: (number | {
            value?: number;
            minvalue?: number;
            maxvalue?: number;
        })[], options?: Function | {
            title?: boolean | string;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
            onEnterKey?: Function | Function[];
            onActivate?: Function | Function[];
            onDeactivate?: Function | Function[];
        }): this;
        addSlider(name: string, initial_value?: number | {
            value?: number;
            minvalue?: number;
            maxvalue?: number;
        }, options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onEnterKey?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addPoint(name: string, initial_value?: [number, number], options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onEnterKey?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addPoint3d(name: string, initial_value?: [number, number, number], options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onEnterKey?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addFile(name: string, initial_value?: string, options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onEnterKey?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
            filter?: string;
        }): this;
        addFolder(name: string, initial_value?: string, options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onEnterKey?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addCheckbox(name: string, initial_value?: boolean | {
            value?: boolean;
            text?: string;
        }, options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addCheckboxes(name: string, initial_values?: (boolean | {
            value?: boolean;
            text?: string;
        })[], options?: Function | {
            title?: boolean | string;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
            onActivate?: Function | Function[];
            onDeactivate?: Function | Function[];
        }): this;
        addRadiobutton(name: string, initial_values: string[], options?: Function | {
            title?: boolean | string;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
        }): this;
        addColor(name: string, initial_value?: [number, number, number], options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addColors(name: string, initial_values?: ([number, number, number])[], options?: Function | {
            title?: boolean | string;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
            onActivate?: Function | Function[];
            onDeactivate?: Function | Function[];
        }): this;
        addPopup(name: string, initial_value?: (string[] | {
            value: string;
            items: string[];
        }), options?: Function | {
            title?: boolean | string;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addPopups(name: string, initial_values?: (string[] | {
            value: string;
            items: string[];
        })[], options?: Function | {
            title?: boolean | string;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
            onActivate?: Function | Function[];
            onDeactivate?: Function | Function[];
        }): this;
        addListbox(name: string, initial_value?: (string[] | {
            value: string;
            items: string[];
        }), options?: Function | {
            title?: boolean | string;
            height?: number;
            helpTip?: string;
            autoSave?: boolean;
            callback?: Function;
            onDoubleClick?: Function;
            onActivate?: Function;
            onDeactivate?: Function;
        }): this;
        addListboxes(name: string, initial_values?: (string[] | {
            value: string;
            items: string[];
        })[], options?: Function | {
            title?: boolean | string;
            height?: number;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function | Function[];
            onDoubleClick?: Function | Function[];
            onActivate?: Function | Function[];
            onDeactivate?: Function | Function[];
        }): this;
        addScript(name: string, value?: Function | {
            title?: string;
            helpTip?: string | string[];
            autoSave?: boolean;
            callback?: Function;
            undo?: boolean;
        }): this;
        addHelp(name: string, value?: string | Function): this;
        api(name: string, fn: Function): this;
        on(type: string, fn: Function): this;
        off(type: string, fn: Function): this;
        trigger(type: string, ...args: any[]): this;
        private validateParameter(name);
        get(name: string, index?: number): any;
        set(name: string, value_or_index?: any, value2?: any): this;
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
declare namespace KIKAKU.Decorator {
    function debug(shouldDebug?: boolean): (proto: any, name: string) => void;
    function undo(text: string): (proto: any, name: string) => void;
}
declare namespace KIKAKU {
    class Xorshift {
        static MAX: number;
        private _x;
        private _y;
        private _z;
        private _w;
        constructor(seed?: number);
        random(mn?: number, mx?: number): number;
    }
}
