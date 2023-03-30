declare const _default: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        values: string[];
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: BooleanConstructor;
    color: StringConstructor;
}, {
    handleClick: (evt: MouseEvent) => void;
    className: import("vue").ComputedRef<(string | {
        'is-disabled': boolean;
        'is-round': boolean;
    })[]>;
    style: import("vue").ComputedRef<{}>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    click: (evt: MouseEvent) => boolean;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        values: string[];
        default: string;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: BooleanConstructor;
    color: StringConstructor;
}>> & {
    onClick?: (evt: MouseEvent) => any;
}, {
    type: string;
    disabled: boolean;
    round: boolean;
}>;
export default _default;
