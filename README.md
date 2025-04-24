# vite-plugin-preload-image

一个用于项目图片预加载的vite插件

## 😊 安装 Installation
```bash
$ npm i --save-dev @liuqisiwu/vite-plugin-preload-image
# or
$ yarn add --dev @liuqisiwu/vite-plugin-preload-image
# or
$ pnpm add --save-dev @liuqisiwu/vite-plugin-preload-image
```

## 😉 配置 Options

### `imageDirs`(`string[]`)
图片资源所在的目录。

### `attrs`(`Attrs`)
```ts
type Attrs = {
    rel: 'prefetch' | 'preload'
}   
```
link标签属性。

## 😏 使用 Usage

```js
// vite.config.js
import { preloadImage } from '@liuqisiwu/vite-plugin-preload-image';

export default defineConfig({
    plugins: [
        preloadImage({
            imageDirs: [
                'src/assets/images/*.{png,jpg,jpeg,gif,webp,svg}',
                'public/images/*.{png}'
            ],
            attrs: {
                rel: 'preload' // 默认为prefetch
            }
        })
    ]
})
```
