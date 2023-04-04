export declare const introStepType: string[];
export declare const introStepProps: {
    show: {
        type: BooleanConstructor;
        required: boolean;
    };
    config: {
        type: ObjectConstructor;
        required: boolean;
    };
};
export declare const introStepEmits: {
    click: (evt: MouseEvent) => boolean;
};
