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
    underline: {
        type: BooleanConstructor;
        default: boolean;
    };
    href: {
        type: StringConstructor;
        default: string;
    };
}, {
    className: import("vue").ComputedRef<(string | {
        'is-disabled': boolean;
        'is-underline': boolean;
    })[]>;
    handleClick: (event: MouseEvent) => void;
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
    underline: {
        type: BooleanConstructor;
        default: boolean;
    };
    href: {
        type: StringConstructor;
        default: string;
    };
}>> & {
    onClick?: (evt: MouseEvent) => any;
}, {
    type: string;
    disabled: boolean;
    underline: boolean;
    href: string;
}>;
export default _default;
