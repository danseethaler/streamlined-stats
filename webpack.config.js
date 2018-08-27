const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = (env, options) => {
  const isDev = options.mode === 'development';

  let appCacheConfig;

  const plugins = [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/favicon.png',
      persistentCache: true,
      emitStats: false,
      inject: true,
      title: 'Web Base',
      icons: {
        android: false,
        appleIcon: false,
        appleStartup: false,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false,
      },
    }),
  ];

  return {
    devtool: isDev ? 'inline-source-map' : false,
    entry: ['babel-polyfill', './src'],
    output: {
      publicPath: '/',
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json'],
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
          test: /\.tsx?$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'ts-loader',
            },
          ],
          exclude: /node_modules/,
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
