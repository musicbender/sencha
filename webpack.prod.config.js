const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.json'],
  },
  entry: {
    index: [path.join(__dirname, '/src/index.js')],
    vendor: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    path: path.join(__dirname, '/dist/public'),
    filename: 'dist.js',
    publicPath: '/public',
  },
  module: {
    rules: [{
      test: /\.jsx*$/,
      include: path.join(__dirname, '/src'),
      loader: "babel-loader",
      exclude: /node_modules/,
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader'],
      }),
    },
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: {
          loader: "css-loader",
          options: {
            sourceMap: true,
          },
        },
        publicPath: "../public",
      }),
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?name=[path][name].[ext]'
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i, loader: "file-loader?name=[path][hash].[ext]"
    }],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      }
    }),
    new CopyWebpackPlugin([
      { from: 'src/vendor/mochawesome/assets/*', to: path.resolve(__dirname, 'dist/public'), flatten: true}
    ]),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
  ],
};

module.exports = config;
