const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebappWebpackPlugin = require('webapp-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: './app/index.js',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/app/index.html'),
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/app/service-worker.js'),
        to: path.resolve(__dirname, '../dist/service-worker.js')
      },
      {
        from: path.resolve(__dirname, '../src/app/manifest.json'),
        to: path.resolve(__dirname, '../dist/manifest.json')
      },
      {
        from: path.resolve(__dirname, '../src/assets/images/pwa-icons/icons-192.png'),
        to: path.resolve(__dirname, '../dist/icons-192.png')
      },
      {
        from: path.resolve(__dirname, '../src/assets/images/pwa-icons/icons-512.png'),
        to: path.resolve(__dirname, '../dist/icons-512.png')
      }
    ]),
    new WebappWebpackPlugin({
      logo: path.resolve(__dirname, '../src/assets/images/pwa-icons/icons-192.png'),
      prefix: '/',
      favicons: {
        appName: 'FontEndJedi',
        appDescription: 'Test App for FrontEndJedi role',
        developerName: 'André Pesci Cazetto',
        developerURL: null,
        background: '#FFF',
        theme_color: '#000',
        icons: {
          coast: false,
          yandex: false
        }
      }
    })
  ]
}
