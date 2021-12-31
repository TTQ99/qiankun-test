const appName = require('./package.json').name;
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|webp|woff2?|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {},
          },
        ],
      },
    ],
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  output: {
    library: `${appName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${appName}`,
  },
};