const path = require('path')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: {
      index: '/',
    },
    port: 3000,
  },
  plugins: [new ReactRefreshWebpackPlugin()],
}
