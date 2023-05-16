export declare const linkType: string[];
export declare const linkProps: {
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
};
export declare const linkEmits: {
    click: (evt: MouseEvent) => boolean;
};
