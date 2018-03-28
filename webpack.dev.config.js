const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PORT = require('./server/config').PORT;

const config = {
  devtool: 'cheap-module-source-map',
  target: 'web',
  resolve: {
    extensions: ['.js', '.json'],
  },
  entry: {
    index: [
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      path.join(__dirname, '/src/index.js'),
    ],
    vendor: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'dist.js',
    publicPath: 'http://localhost:' + PORT + '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx*$/,
        include: path.join(__dirname, '/src'),
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        include: path.join(__dirname, '/src'),
        loader: "style-loader!css-loader!sass-loader",
      },
      {
        test: /\.css$/,
        loader: "css-loader",
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=[path][name].[ext]'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=[path][name].[ext]"
      },
      {
        test: /\.pug/,
        loader: "pug-loader",
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'LIVE': false,
        'CLIENT': JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
        'PORT': PORT,
        'BASE_URL': JSON.stringify('http://localhost'),
      },
    }),
    new CopyWebpackPlugin([
      { from: 'src/vendor/mochawesome/assets/*', to: path.resolve(__dirname, 'dist'), flatten: true},
      // { from: 'server/temp/runner.json', to: path.resolve(__dirname, 'dist'), flatten: true }
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
  ]
};

module.exports = config;
