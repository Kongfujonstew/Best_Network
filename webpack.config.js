/*eslint-disable*/

const webpack = require('webpack');
// const dotenv = require('dotenv');
// const Dotenv = require('dotenv-webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// dotenv.config();

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
  const cssLastLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader';
  const devtool = isProd ? 'source-map' : 'cheap-module-source-map';
  const performance = { maxAssetSize: 300000, maxEntrypointSize: 300000 };

  const cssLoader = [
    {
      loader: cssLastLoader
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

  // const optimization = isProd ?
  //   {
  //     splitChunks: {
  //       chunks: 'async',
  //       minSize: 30000,
  //       minChunks: 1,
  //       maxAsyncRequests: 5,
  //       maxInitialRequests: 3,
  //       automaticNameDelimiter: '~',
  //       name: true,
  //       cacheGroups: {
  //         vendors: {
  //           test: /[\\/]node_modules[\\/]/,
  //           priority: -10
  //         },
  //         default: {
  //           minChunks: 2,
  //           priority: -20,
  //           reuseExistingChunk: true
  //         }
  //       }
  //     },
  //     mangleWasmImports: true,
  //     minimizer: [
  //       new UglifyJSPlugin({
  //         sourceMap: true,
  //         compress: {
  //           warnings: false,
  //           screw_ie8: true,
  //           conditionals: true,
  //           unused: true,
  //           comparisons: true,
  //           sequences: true,
  //           dead_code: true,
  //           evaluate: true,
  //           if_return: true,
  //           join_vars: true,
  //         },
  //       })
  //     ]
  //   } :
  //   { namedModules: true };

  const plugins = [

    //this can be added to optimization object
    // new webpack.EnvironmentPlugin({
    //   'process.env': process.env,
    //   nodeEnv: {
    //     NODE_ENV: JSON.stringify(mode),
    //     SANDBOX: isSandbox
    //   }
    // }),

    // new Dotenv({
    //   path: './.env',
    //   safe: false
    // }),

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

    // make sure script tags are async to avoid blocking html render
    // new ScriptExtHtmlWebpackPlugin({
    //   defaultAttribute: 'async',
    // }),

    // new MiniCssExtractPlugin(),

    // new webpack.ProgressPlugin()
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
  }

  return {
    // optimization,
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
        // {
        //   test: /\.(html|svg|jpe?g|png|ttf|woff2?)$/,
        //   exclude: /node_modules/,
        //   use: {
        //     loader: 'file-loader',
        //     options: {
        //       name: 'static/[name]-[hash:8].[ext]',
        //     },
        //   },
        // },
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
