const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'
const libraryName = 'reactGlide';

module.exports = {
  entry: path.join(__dirname),
  output: {
    path: path.join(__dirname, 'dist'),
    library: libraryName,
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    },
    minimizer: [
      new UglifyJsPlugin({
        exclude: /\.html/,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader']
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          //  MiniCssExtractPlugin.loader,
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.tsx/,
        exclude: /node_modules/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.tsx', '.css', '.ts'],
  },
  devServer: {
    contentBase: 'dist',
    port: 3000,
    open: true,
    host: 'localhost',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'example/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      entry: 'src/index.css',
      // filename: devMode ? '[name].css' : '[name].[hash].css',
      // chunkFilename: devMode ? '.css' : '[id].[hash].css',
      filename: libraryName + '.css',
      chunkFilename: libraryName + '.[id].css'
    }),

  ]
};
