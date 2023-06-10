const path = require('path');
const webpack = require('webpack')

module.exports = {
  entry: './app/components/MinkaWallets.web.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig-webpack.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.js'],
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "stream": require.resolve("stream-browserify"),
      "http": require.resolve("http-browserify"),
      "https": require.resolve("https-browserify"),
      "zlib": require.resolve("browserify-zlib"),
      "url": require.resolve("url"),
      "assert": require.resolve("assert"),
    }
  },
  output: {
    filename: 'minka-wallets.wc.js',
    path: path.resolve(__dirname, 'build/components/'),
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ]
};