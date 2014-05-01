var path = require('path');

module.exports = {
  contentBase: '#{__dirname}/src/',
  cache: true,
  entry: {
    app: './src/scripts/app',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    loaders: [{
      test: /\.coffee$/,
      loader: 'coffee',
    // }, {
      // test: /[\/\b]react-bootstrap\/.*\.jsx$/,
      // loaders: ['es6-loader', 'jsx'],
    }],
  },
  resolve: {
    extensions: [
      '',
      '.coffee',
      '.js',
      '.jsx',
    ],
    modulesDirectories: [
      'src',
      'src/scripts',
      'vendor',
      'bower_components',
      'node_modules',
    ],
  },
  plugins: []
};
