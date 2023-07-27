declare const _default: {
    questionOne: {
        name: string;
        type: string;
        message: string;
        validate(value: any): true | "Please Enter your Project's name";
    }[];
    questionAdd: ({
        name: string;
        type: string;
        message: string;
        validate(value: any): true | "Template name is illegal." | "Please Enter your Template's name.";
        default?: undefined;
    } | {
        name: string;
        type: string;
        message: (args: any) => string;
        default: boolean;
    })[];
    questionRemove: ({
        name: string;
        type: string;
        message: string;
        choices: never[];
        default?: undefined;
    } | {
        name: string;
        type: string;
        message: (args: any) => string;
        default: boolean;
        choices?: undefined;
    })[];
};
export default _default;
