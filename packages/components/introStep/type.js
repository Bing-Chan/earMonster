export const introStepType = ['default', 'primary', 'success', 'warning', 'info', 'danger', 'text', ''];
export const introStepProps = {
    show: {
        type: Boolean,
        required: true,
    },
    config: {
        type: Object,
        required: true,
    },
};
export const introStepEmits = {
    click: (evt) => evt instanceof MouseEvent,
};
