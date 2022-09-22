const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development'
if (process.env.NODE_ENV === 'production') {
  mode = 'production'
}
console.log('MODE >>>', mode);

module.exports = {
  mode: mode,

  output: {
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
    clean: true
  },

  devtool: 'source-map',

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader'
      },

      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader:'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                    'postcss-preset-env',
                ]
              }
            }
          },
          'sass-loader'
        ]
    },
    {
      test: /\.(png|jpg|jpeg|gif|svg)$/i,
      type: 'asset/resource'
    },

    {
      test:/\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource'
    },

    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
  },
}