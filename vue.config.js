const autoprefixer = require("autoprefixer");
const pxToViewport = require("postcss-px-to-viewport");
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxToViewport({
            // unitToConvert: "px",
            viewportWidth: 1920,
            // unitPrecision: 5,
            // propList: ["*"],
            // viewportUnit: "vw",
            // fontViewportUnit: "vw",
            // selectorBlackList: [],
            // minPixelValue: 1,
            // mediaQuery: false,
            // replace: true,
            // exclude: undefined,
            // include: undefined,
            // landscape: false,
            // landscapeUnit: "vw",
            // landscapeWidth: 568,
          }),
        ],
      },
    },
  },
};
