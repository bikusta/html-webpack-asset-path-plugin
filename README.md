# html-webpack-asset-path-plugin

[![npm version](https://badge.fury.io/js/html-webpack-asset-path-plugin.svg)](https://badge.fury.io/js/html-webpack-asset-path-plugin)

_compatible with webpack 4 and 5_

Addon for the [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) to customize the value of link-href and script-src attributes.

## Introduction

The primary intention of the plugin is to alter the URLs of CSS and JavaScript assets so that the generated HTML files can be used as templates of a server-side framework. For example, consider the following [Django](https://www.djangoproject.com/) template:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Django</title>
    <link href="{% static 'django/css/style.css' %}" rel="stylesheet" />
  </head>
  <body>
    <script src="{% static 'django/js/main.js' %}"></script>
  </body>
</html>
```

In Django, `{% static %}` template tags are used to reference static assets. When a client requests a page, Django converts those tags into absolute URLs. On the other side, consider the following output from webpack:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Webpack</title>
    <link href="webpack/css/main.css" rel="stylesheet" />
  </head>
  <body>
    <script src="webpack/js/main.js"></script>
  </body>
</html>
```

The output from webpack must be modified so that it can be used as a Django template. This is where the plugin kicks in. The plugin allows you to define appropriate pre- and suffixes to make the files compatible.

## Installation

    npm install --save-dev html-webpack-asset-path-plugin

## Usage

In order to use the plugin, you need to `require()` it and add it to the `plugins` array.

**webpack.config.js**

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackAssetPathPlugin = require("html-webpack-asset-path-plugin");

module.exports = {
  plugins: [new HtmlWebpackPlugin(), new HtmlWebpackAssetPathPlugin()]
};
```

The plugin can also be used in combination with [Vue CLI](https://cli.vuejs.org/).

**vue.config.js**

```javascript
const HtmlWebpackAssetPathPlugin = require("html-webpack-asset-path-plugin");

module.exports = {
  configureWebpack: {
    plugins: [new HtmlWebpackAssetPathPlugin()]
  }
};
```

## Options

You can pass a configuration object to the constructor of the plugin.

| Option      | Description                            |
| :---------- | :------------------------------------- |
| `cssPrefix` | Snippet to place before the CSS asset. |
| `cssSuffix` | Snippet to place after the CSS asset.  |
| `jsPrefix`  | Snippet to place before the JS asset.  |
| `jsSuffix`  | Snippet to place after the JS asset.   |

## Example

The following configuration solves the problem from the introductory example concerning Django template tags:

```javascript
new HtmlWebpackAssetPathPlugin({
  cssPrefix: "{% static 'django/css/",
  cssSuffix: "' %}",
  jsPrefix: "{% static 'django/js/",
  jsSuffix: "' %}"
});
```

## License

MIT License

Copyright (c) 2022 Stefan Beer

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
