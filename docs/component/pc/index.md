## 👷安装

```shell
# Vue 3 项目，安装最新版  @ear-monster/components
npm i  @ear-monster/components
```

当然，你也可以通过 `yarn` 或 `pnpm` 进行安装：

```bash
# 通过 yarn 安装
yarn add  @ear-monster/components

# 通过 pnpm 安装
pnpm add  @ear-monster/components
```


## 🏌快速上手

```js
import { createApp } from 'vue';
//😂😂😂由于自己当时申请的npm包起了这个名字，现在没法改了，重新申请需要交钱，我就放弃了，先将就用着
import * as galaxyUI from ' @ear-monster/components';

const app = createApp();
//注册你的全局组件
app.use(earMonster);

// 也可以按需引入哦~
import {EarIntroStep  } from ' @ear-monster/components';

//注册你的全局组件
app.compoent(EarIntroStep);
```


