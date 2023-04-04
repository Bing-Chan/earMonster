export interface IProps {
    width?: number;
    height?: number;
    lineWidth?: number;
    strokeColor?: string;
    lineCap?: string;
    lineJoin?: string;
    bgColor?: string;
    showBtn?: boolean;
    onSave?: (blob: Blob) => void;
    onClear?: (canvasContext: CanvasRenderingContext2D) => void;
    onDrawEnd?: (canvas: HTMLCanvasElement) => void;
}
declare const _default: import("vue").DefineComponent<{
    width: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    height: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    lineWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    strokeColor: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    lineCap: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    lineJoin: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    bgColor: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    showBtn: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    onSave: {
        type: FunctionConstructor;
        required: false;
    };
    onClear: {
        type: FunctionConstructor;
        required: false;
    };
    onDrawEnd: {
        type: FunctionConstructor;
        required: false;
    };
}, {
    props: {
        width: number;
        height: number;
        lineWidth: number;
        strokeColor: string;
        lineCap: string;
        lineJoin: string;
        bgColor: string;
        showBtn: boolean;
        onSave?: (blob: Blob) => void;
        onClear?: (canvasContext: CanvasRenderingContext2D) => void;
        onDrawEnd?: (canvas: HTMLCanvasElement) => void;
    };
    width: number;
    height: number;
    lineWidth: number;
    strokeColor: string;
    lineCap: string;
    lineJoin: string;
    bgColor: string;
    showBtn: boolean;
    onSave: (blob: Blob) => void;
    onClear: (canvasContext: CanvasRenderingContext2D) => void;
    onDrawEnd: (canvas: HTMLCanvasElement) => void;
    canvasRef: any;
    ctxRef: any;
    client: any;
    mobileStatus: boolean;
    cancel: () => void;
    save: () => void;
    draw: (event: {
        changedTouches?: any;
        pageX?: any;
        pageY?: any;
    }) => void;
    init: (event: {
        changedTouches?: any;
        offsetX?: any;
        offsetY?: any;
        pageX?: any;
        pageY?: any;
    }) => void;
    closeDraw: () => void;
    initCanvas: () => void;
    addEventListener: () => void;
    removeEventListener: () => void;
    initEsign: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    width: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    height: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    lineWidth: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    strokeColor: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    lineCap: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    lineJoin: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    bgColor: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    showBtn: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    onSave: {
        type: FunctionConstructor;
        required: false;
    };
    onClear: {
        type: FunctionConstructor;
        required: false;
    };
    onDrawEnd: {
        type: FunctionConstructor;
        required: false;
    };
}>>, {
    width: number;
    height: number;
    lineWidth: number;
    strokeColor: string;
    lineCap: string;
    lineJoin: string;
    bgColor: string;
    showBtn: boolean;
}>;
export default _default;
