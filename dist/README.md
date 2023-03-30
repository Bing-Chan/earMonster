<h1 align="center">Galaxy-UI</h1>


<p align="center">
    <img src="https://img.shields.io/npm/v/vant?style=flat-square" alt="npm version" />
    <img src="https://img.shields.io/codecov/c/github/vant-ui/vant/dev.svg?style=flat-square&color=#4fc08d" alt="Coverage Status" />
    <img src="https://img.shields.io/npm/dm/vant.svg?style=flat-square&color=#4fc08d" alt="downloads" />
    <img src="https://img.badgesize.io/https://unpkg.com/vant/lib/vant.min.js?compression=gzip&style=flat-square&label=gzip%20size&color=#4fc08d" alt="Gzip Size" />
</p>

<p align="center">
  🔥 <a href="https://gitee.com/duochan/request_cb">文档网站（Gitee）</a>
  &nbsp;
  🌈 <a href="https://vant-ui.github.io/vant">文档网站（GitHub）</a>
     &nbsp;
  🌈 <a href="https://www.npmjs.com/package/request_cb?activeTab=readme">安装包（NPM）</a> 
</p>

### 🕵介绍

Galaxy UI  是自己编写一些日常工作中用到的插件，整理起来，方便复用,目前支持[Vue 3 版本](https://vant-contrib.gitee.io/vant)

自己模仿尝试编写的简单轻量插件，希望有志同道合的同学或大佬赐教，多提意见~



## 🏋特性

- 🚀 性能极佳，组件平均体积小于 1KB（min+gzip）
- 🚀 零外部依赖，不依赖三方 npm 包
- 💪 使用 TypeScript 编写，提供完整的类型定义
- 📖 提供丰富的中英文文档和组件示例
- 📖 提供 Sketch 和 Axure 设计资源
- 🍭 Vue 3  omposition API
- 🍭 支持按需引入和 Tree Shaking消除无用代码
- 🍭 支持国际化



## 👷安装

```shell
# Vue 3 项目，安装最新版 Galaxy UI 
npm i request_cb
```

当然，你也可以通过 `yarn` 或 `pnpm` 进行安装：

```bash
# 通过 yarn 安装
yarn add request_cb

# 通过 pnpm 安装
pnpm add request_cb
```



## 🏌快速上手

```js
import { createApp } from 'vue';
//😂😂😂由于自己当时申请的npm包起了这个名字，现在没法改了，重新申请需要交钱，我就放弃了，先将就用着
import * as galaxyUI from 'request_cb';

const app = createApp();
//注册你的全局组件
app.use(galaxyUI);

// 也可以按需引入哦~
import {GAButton } from 'request_cb';

//注册你的全局组件
app.compoent(GAButton);
```



## ☎️联系方式

| [<img src="https://avatars.githubusercontent.com/u/8662948?v=4" alt="chenjiahan" style="zoom:30%;" />](https://github.com/Bing-Chan) |
| :----------------------------------------------------------: |
|      [Bing-Chan(GitHub)](https://github.com/Bing-Chan)       |

