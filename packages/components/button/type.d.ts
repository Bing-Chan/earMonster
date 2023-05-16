export declare const buttonType: string[];
export declare const buttonProps: {
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
};
export declare const buttonEmits: {
    click: (evt: MouseEvent) => boolean;
};
