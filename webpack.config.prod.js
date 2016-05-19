import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false,
};

const PUBLIC_PATH = '/'; // TODO check this before building

export default {
  debug: true,
  // more info:https://webpack.github.io/docs/build-performance.html#sourcemaps
  // and https://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: './demo/index',
  target: 'web', // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  output: {
     // Note: Physical files are only output by the production build task `npm run build`.
    path: `${__dirname}/dist`,
    publicPath: PUBLIC_PATH,
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: [
          // path.join(__dirname, 'src'),
          path.join(__dirname, 'demo'),
        ],
        loaders: ['babel', 'eslint'],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/i,
        loaders: ['file?name=iliade.[ext]'],
      },
      {
        test: /(\.css|\.scss)$/,
        include: [
          path.join(__dirname, 'demo'),
          path.join(__dirname, 'src/styles/styles.scss'),
          path.join(__dirname, 'node_modules/semantic-ui-css/semantic.css'),
        ],
        loader: ExtractTextPlugin.extract("css!sass?sourceMap"),
      },
    ],
  },
};
