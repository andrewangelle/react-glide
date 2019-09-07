
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path');

const config = {
  entry: path.join(__dirname, 'src/index.ts'),
  externals: {
    react: 'react',
  },
  mode: 'none',
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
          'css-loader'
        ]
      },
      {
        test: /^(?!.*test\.tsx|\.ts?$).*\.tsx|\.ts?$/,
        exclude: /node_modules/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
    ]
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
  output: {
    path: `${__dirname}/lib`,
    filename: 'index.min.js',
    library: 'react-glide',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts', '.css'],
    modules: ['node_modules']
  },
  plugins: [
    new MiniCssExtractPlugin({
      entry: 'src/reactGlide.css',
      filename: 'reactGlide' + '.css',
      chunkFilename: 'reactGlide' + '.[id].css'
    }),
  ],
  target: 'node'
};

module.exports = config

// module.exports = {
//   entry: {
//     index: path.join(__dirname, 'src/index.ts'),
//     Glide: path.join(__dirname, 'src/Glide.tsx')
//   },
//   output: {
//     path: path.join(__dirname, 'lib'),
//     library: libraryName,
//     filename: '[name].js',
//     libraryTarget: "umd",
//     umdNamedDefine: true,
//     publicPath: '/'
//   },
//   optimization: {
//     minimizer: [
//       new UglifyJsPlugin({
//         include: /\.js/,
//         parallel: true,
//         sourceMap: true
//       }),
//       new OptimizeCSSAssetsPlugin({})
//     ]
//   },
//   module: {
//     rules: [
//       {
//         test: /^(?!.*test\.tsx|\.ts?$).*\.tsx|\.ts?$/,
//         exclude: /node_modules/,
//         use: ['babel-loader']
//       },
//       {
//         test: /\.css/,
//         exclude: /node_modules/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//         ]
//       },
//       {
//         test: /^(?!.*test\.js?$).*\.js?$/,
//         exclude: /node_modules/,
//         use: ["source-map-loader"],
//         enforce: "pre"
//       },
//     ]
//   },
//   resolve: {
//     extensions: ['.js', '.tsx', '.css', '.ts', '.jsx'],
//   },
//   plugins: [
//     new MiniCssExtractPlugin({
//       entry: 'src/reactGlide.css',
//       filename: 'reactGlide' + '.css',
//       chunkFilename: 'reactGlide' + '.[id].css'
//     }),
//   ]
// };
