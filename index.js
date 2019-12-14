function HtmlWebpackAssetPathPlugin(options) {
  options = options || {};
  this.options = {
    cssPrefix: options.cssPrefix,
    cssSuffix: options.cssSuffix,
    jsPrefix: options.jsPrefix,
    jsSuffix: options.jsSuffix
  };
}

HtmlWebpackAssetPathPlugin.prototype.apply = function(compiler) {
  const self = this;
  compiler.hooks.compilation.tap("HtmlWebpackAssetPathPlugin", function(
    compilation
  ) {
    compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
      "HtmlWebpackAssetPathPlugin",
      function(htmlPluginData, callback) {
        let message = null;
        try {
          self.processTags(htmlPluginData.head);
          self.processTags(htmlPluginData.body);
        } catch (err) {
          message = "HtmlWebpackAssetPathPlugin: " + err;
        } finally {
          callback(message);
        }
      }
    );
  });
};

HtmlWebpackAssetPathPlugin.prototype.processTags = function(tags) {
  const self = this;
  tags.forEach(function(tag) {
    self.processTag(tag);
  });
};

HtmlWebpackAssetPathPlugin.prototype.processTag = function(tag) {
  if (this.isLinkTag(tag)) {
    this.processLinkTag(tag);
  } else if (this.isScriptTag(tag)) {
    this.processScriptTag(tag);
  }
};

HtmlWebpackAssetPathPlugin.prototype.isLinkTag = function(tag) {
  return tag.tagName === "link";
};

HtmlWebpackAssetPathPlugin.prototype.isScriptTag = function(tag) {
  return tag.tagName === "script";
};

HtmlWebpackAssetPathPlugin.prototype.processLinkTag = function(tag) {
  tag.attributes.href = this.buildAssetUrl(tag.attributes.href);
};

HtmlWebpackAssetPathPlugin.prototype.processScriptTag = function(tag) {
  tag.attributes.src = this.buildAssetUrl(tag.attributes.src);
};

HtmlWebpackAssetPathPlugin.prototype.buildAssetUrl = function(url) {
  const urlParts = this.parseUrl(url);
  if (this.isCssAsset(urlParts.assetName)) {
    return this.buildCssUrl(urlParts);
  } else if (this.isJsAsset(urlParts.assetName)) {
    return this.buildJsUrl(urlParts);
  }
  return url;
};

HtmlWebpackAssetPathPlugin.prototype.parseUrl = function(url) {
  const slash = url.lastIndexOf("/");
  return {
    prefix: slash < 0 ? "" : url.substr(0, slash + 1),
    assetName: slash < 0 ? url : url.substr(slash + 1),
    suffix: ""
  };
};

HtmlWebpackAssetPathPlugin.prototype.isCssAsset = function(assetName) {
  return /\.css$/.test(assetName);
};

HtmlWebpackAssetPathPlugin.prototype.isJsAsset = function(assetName) {
  return /\.js$/.test(assetName);
};

HtmlWebpackAssetPathPlugin.prototype.buildCssUrl = function(urlParts) {
  const prefix = this.getString(this.options.cssPrefix, urlParts.prefix);
  const suffix = this.getString(this.options.cssSuffix, urlParts.suffix);
  return prefix + urlParts.assetName + suffix;
};

HtmlWebpackAssetPathPlugin.prototype.buildJsUrl = function(urlParts) {
  const prefix = this.getString(this.options.jsPrefix, urlParts.prefix);
  const suffix = this.getString(this.options.jsSuffix, urlParts.suffix);
  return prefix + urlParts.assetName + suffix;
};

HtmlWebpackAssetPathPlugin.prototype.getString = function(value, defaultValue) {
  return typeof value === "string" ? value : defaultValue;
};

module.exports = HtmlWebpackAssetPathPlugin;
