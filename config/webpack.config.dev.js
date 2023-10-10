const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: ['babel-polyfill', './src/index.js'],

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "../public"),
    port: 3000,
    publicPath: "/dist/"
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
