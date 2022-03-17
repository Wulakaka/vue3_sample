const pxtorem = require("postcss-pxtorem");
const autoprefixer = require("autoprefixer");
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            propList: ["*"],
          }),
        ],
      },
    },
  },
};
