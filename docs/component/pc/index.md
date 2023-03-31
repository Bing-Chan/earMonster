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


