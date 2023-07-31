"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_router_1 = require("vue-router");
const routes_1 = require("./routes");
const router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)('/'),
    routes: routes_1.default,
});
router.beforeEach(async (_to, _from, next) => {
    // const userStore = useUserStore();
    // const user = userStore.getUserInfo;
    // console.log(user.orgCode,"user")
    // if (!user.orgCode) {
    //   const res = await getUserInfo({});
    //   if (res.status == 0) {
    //     userStore.setInfo(res.data);
    //   }
    // }
    next();
});
exports.default = router;
