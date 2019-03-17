const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const libraryName = 'reactGlide';

module.exports = {
  entry: path.join(__dirname, 'src'),
  output: {
    path: path.join(__dirname, 'lib'),
    library: libraryName,
    filename: libraryName + '.js',
    libraryTarget: "umd",
    umdNamedDefine: true,
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        include: /\.js/,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /^(?!.*test\.tsx|\.ts?$).*\.tsx|\.ts?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
        ]
      },
      {
        test: /^(?!.*test\.js?$).*\.js?$/,
        exclude: /node_modules/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.tsx', '.css', '.ts', '.jsx'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      entry: 'src/index.css',
      filename: libraryName + '.css',
      chunkFilename: libraryName + '.[id].css'
    }),
  ]
};
