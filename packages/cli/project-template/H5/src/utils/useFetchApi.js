"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@vueuse/core");
const vant_1 = require("vant");
const useFetchApi = (0, core_1.createFetch)({
    baseUrl: '',
    options: {
        async beforeFetch({ options }) {
            const myToken = 'token';
            options.headers = Object.assign(Object.assign({}, options.headers), { Authorization: `Bearer ${myToken}` });
            return { options };
        },
        afterFetch(ctx) {
            console.log(ctx);
            const { data, response } = ctx;
            if (response.status >= 200 && response.status < 300) {
                try {
                    console.log(response);
                    const jsonObj = data;
                    if (jsonObj.code != 200) {
                        (0, vant_1.showNotify)({ type: 'danger', message: jsonObj.message || 'Error' });
                    }
                    ctx.data = jsonObj.data;
                }
                catch (error) {
                    console.error(error);
                    ctx.data = null;
                }
            }
            else {
                (0, vant_1.showNotify)({ type: 'danger', message: response.statusText || 'Error' });
                ctx.data = null;
            }
            return ctx;
        },
    },
});
exports.default = useFetchApi;
