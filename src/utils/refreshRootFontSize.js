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
