var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/www');
var APP_DIR = path.resolve(__dirname, 'src/app');

var config = {
  entry: {
    app: APP_DIR + '/index',
    vendor: [
      'react',
      'react-bootstrap',
      'react-router',
      'react-helmet',
    ]
  },
  output: {
    path: BUILD_DIR + '/dist',
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  module: {
    loaders: [
      {
        test : /\.jsx?/,
        include: APP_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    unsafeCache: true
  },
  node: {
    fs: "empty"
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ],
};

module.exports = config;
