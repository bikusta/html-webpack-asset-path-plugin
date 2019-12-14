const HtmlWebpackAssetPathPlugin = require("../..");

module.exports = {
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new HtmlWebpackAssetPathPlugin({
        cssPrefix: "http://bikusta.de/css/",
        cssSuffix: "?type=css",
        jsPrefix: "http://bikusta.de/js/",
        jsSuffix: "?type=js"
      })
    ]
  }
};
