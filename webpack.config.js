const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
  const isDev = options.mode === 'development';

  let appCacheConfig;

  const plugins = [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ];

  return {
    devtool: isDev ? 'inline-source-map' : false,
    entry: ['babel-polyfill', './src'],
    output: {
      publicPath: '/',
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
      mainFiles: ['index'],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {minimize: true},
            },
          ],
        },
        {
          test: /\.jsx?$/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
        },
        {
          test: /\.woff$/,
          loader: 'url-loader',
        },
      ],
    },
    devServer: {
      // Pass any unhandled routes to index.html to allow
      // the frontend routing to handle the page
      historyApiFallback: true,
    },
    plugins,
  };
};
