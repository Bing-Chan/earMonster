import introStep from './introStep.vue';
introStep.install = (app) => {
    app.component(introStep.name, introStep);
};
export default introStep;
