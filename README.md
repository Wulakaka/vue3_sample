# vue3_sample

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 安装 postcss-pxtorem

### 引入依赖
- ^6.0.0 需要 PostCSS 8
- 但是使用 PostCSS 8 会报错
- 需要使用^5.0.0 版本
- vue-cli 内置了PostCSS，无需再次引入
```
npm install postcss-pxtorem@5 --save-dev
```

### 配置 vue.config.js
- 实际上是在修改 postcss-loader 配置
- 仍然需要再次引入 autoprefixer，否则不会生效；但是不需要安装
```js
const pxtorem = require("postcss-pxtorem");
const autoprefixer = require("autoprefixer");

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            // rootValue: 16,
            // unitPrecision: 5,
            // propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
            propList: ['*']
            // selectorBlackList: [],
            // replace: true,
            // mediaQuery: false,
            // minPixelValue: 0,
            // exclude: /node_modules/i
          })
        ]
      }
    }
  }
}
```

### 实现动态更新根元素的 font-size 的方法
- 增加监听及恢复 body 的 font-size
- 可以增加防抖或节流
- 需要恢复 body 的 font-size
```javascript
import throttle from "lodash/throttle";

(function (designWidth) {
  function refreshRootFontSize(designWidth) {
    const docEl = document.documentElement;
    const width = docEl.getBoundingClientRect().width;
    // pxtorem 配置中的 rootValue
    const rootValue = 16;
    const rem = (width / designWidth) * rootValue;
    docEl.style.fontSize = rem + "px";
  }

  function fixBodyFontSize() {
    if (document.readyState === "complete") {
      document.body.style.fontSize = "16px";
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        function () {
          document.body.style.fontSize = "16px";
        },
        false
      );
    }
  }

  const refresh = throttle(() => refreshRootFontSize(designWidth), 300, true);

  window.addEventListener("resize", refresh, false);
  // 当一条会话历史记录被执行的时候将会触发页面显示(pageshow)事件。(这包括了后退/前进按钮操作，同时也会在onload 事件触发后初始化页面时触发)
  window.addEventListener(
    "pageshow",
    (e) => {
      // 如果从缓存中读取
      if (e.persisted) refresh();
    },
    false
  );
  refresh();
  fixBodyFontSize();
})(1920);

```
