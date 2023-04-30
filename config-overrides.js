const path = require('path');

module.exports = {
  paths: function (paths) {
    paths.appBuild = path.resolve(__dirname, './docs')
    paths.appPublic = path.resolve(__dirname, './src/assets');
    paths.appHtml = path.resolve(__dirname, './src/assets/index.html');
    return paths;
  }
}