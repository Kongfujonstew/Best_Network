/*eslint-disable*/

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;
const sourcePath = path.join(__dirname, './src');
const buildDirectory = path.join(__dirname, './build');

const stats = {
  assets: true,
  children: false,
  chunks: false,
  hash: false,
  modules: false,
  publicPath: false,
  timings: true,
  version: false,
  warnings: true,
  colors: {
    green: '\u001b[32m',
  },
};

module.exports = function(env, argv) {
  const mode = argv.mode === 'production' ? 'production' : 'development';
  const isProd = mode === 'production';

  console.log('Webpack building . . .');
  console.log('mode:', mode);

  const entryPoint = isProd ?
    './index.js' :
    [ 'react-hot-loader/patch',
      `webpack-dev-server/client?http://${host}:${port}`,
      'webpack/hot/only-dev-server',
      './index.js',
    ];

  const template = 'index.ejs';
  const devtool = isProd ? 'source-map' : 'cheap-module-source-map';
  const performance = { maxAssetSize: 300000, maxEntrypointSize: 300000 };

  const cssLoader = [
    {
      loader: 'style-loader'
    },
    {
      loader: 'css-loader',
      options: {
        module: true,
        localIdentName: '[path][name]-[local]',
      },
    },
    {
      loader: 'sass-loader',
      options: {
        outputStyle: 'expanded',
        sourceMap: false,
        includePaths: [sourcePath],
      },
    },
  ];

  const plugins = [
    new HtmlWebpackPlugin({
      template,
      inject: true,
      production: isProd,
      minify: isProd && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    new webpack.ProgressPlugin()
  ];


  if (!isProd) {
    plugins.push(
      // make hot reloading work
      new webpack.HotModuleReplacementPlugin(),
      // show module names instead of numbers in webpack stats
      new webpack.NamedModulesPlugin(),
      // don't spit out any errors in compiled assets
      new webpack.NoEmitOnErrorsPlugin(),
    );
  } else {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return {
    // optimization goes here,
    devtool,
    context: sourcePath,
    plugins,
    stats,
    entry: {
      main: entryPoint,
    },
    output: {
      path: buildDirectory,
      publicPath: '/',
      filename: '[name]-[hash:8].js',
      chunkFilename: '[name]-[chunkhash:8].js',
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: cssLoader,
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        }
      ],
    },
    resolve: {
      extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
      modules: [path.resolve(__dirname, 'node_modules'), sourcePath],
    },

    performance,

    devServer: {
      contentBase: './src',
      publicPath: '/',
      historyApiFallback: true,
      port: port,
      host: host,
      hot: !isProd,
      compress: isProd,
      stats: stats,
      watchOptions: {
        poll: 1000,
        aggregateTimeout: 300
      }
    },
  };
};
