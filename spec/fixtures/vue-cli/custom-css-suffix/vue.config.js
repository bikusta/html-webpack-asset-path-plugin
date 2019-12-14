const HtmlWebpackAssetPathPlugin = require("../..");

module.exports = {
  filenameHashing: false,
  configureWebpack: {
    plugins: [
      new HtmlWebpackAssetPathPlugin({
        cssSuffix: "?v=1"
      })
    ]
  }
};
