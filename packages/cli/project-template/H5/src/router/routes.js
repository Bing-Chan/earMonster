"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.routes = [
    {
        path: '/',
        redirect: '/home',
        component: () => Promise.resolve().then(() => require('/@/layout/basic/index.vue')),
        children: [
            {
                path: 'home',
                component: () => Promise.resolve().then(() => require('/@/views/home/index.vue')),
                meta: {
                    title: '我的绩效',
                    keepAlive: true,
                    isHelp: true,
                },
            },
            {
                path: 'ranking',
                component: () => Promise.resolve().then(() => require('/@/views/ranking/index.vue')),
                meta: {
                    title: '排行榜',
                    keepAlive: true,
                    isHelp: true,
                },
            },
            {
                path: 'employee',
                component: () => Promise.resolve().then(() => require('/@/views/employee/index.vue')),
                meta: {
                    title: 'employee.title',
                    keepAlive: true,
                },
            },
            {
                path: '/first',
                component: () => Promise.resolve().then(() => require('/@/views/first/index.vue')),
                meta: {
                    title: '首页',
                    keepAlive: true,
                },
            },
            {
                path: '/example',
                component: () => Promise.resolve().then(() => require('/@/views/first/example.vue')),
                meta: {
                    title: '首页',
                    keepAlive: true,
                },
            },
            {
                path: '/salaryDetails',
                component: () => Promise.resolve().then(() => require('/@/views/first/salaryDetails.vue')),
                meta: {
                    title: '首页',
                    keepAlive: true,
                },
            }
        ],
    },
];
exports.default = exports.routes;
