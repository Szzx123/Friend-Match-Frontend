Initialize front-end by vite

https://cn.vitejs.dev/guide/

```
yarn create vite
```

Choose vue + typescript

Install dependency

```
npm install
```

引入组件库vant 按需引入 

https://vant-ui.github.io/vant/#/zh-CN/quickstart

```
yarn add unplugin-vue-components -D
```

配置插件 在vite.config.ts中

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), 
    Components({
    resolvers: [VantResolver()],
  }),],
})
```

安装vant

```
npm i vant
```

