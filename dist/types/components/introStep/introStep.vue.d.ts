declare const _default: import("vue").DefineComponent<{
    show: {
        type: BooleanConstructor;
        required: boolean;
    };
    config: {
        type: ObjectConstructor;
        required: boolean;
    };
}, {
    init: () => void;
    prev: () => Promise<void>;
    next: () => Promise<void>;
    done: () => void;
    tipBoxStyle: import("vue").ComputedRef<{
        left: string;
        top: string;
        right?: undefined;
        bottom?: undefined;
    } | {
        right: string;
        top: string;
        left?: undefined;
        bottom?: undefined;
    } | {
        left: string;
        bottom: string;
        top?: undefined;
        right?: undefined;
    }>;
    setBoxInfo: (index?: number) => Promise<void>;
    config: import("vue").Ref<Record<string, any>>;
    show: import("vue").Ref<boolean>;
    originalBox: import("vue").Ref<{
        left: number;
        top: number;
        width: number;
        height: number;
    }>;
    tipBoxPosition: import("vue").Ref<string>;
    currentIndex: import("vue").Ref<number>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "update:show"[], "update:show", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    show: {
        type: BooleanConstructor;
        required: boolean;
    };
    config: {
        type: ObjectConstructor;
        required: boolean;
    };
}>> & {
    "onUpdate:show"?: (...args: any[]) => any;
}, {
    show: boolean;
}>;
export default _default;
