const HtmlWebpackAssetPathPlugin = require("../..");

module.exports = {
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new HtmlWebpackAssetPathPlugin({
        cssPrefix: "http://bikusta.de/"
      })
    ]
  }
};
