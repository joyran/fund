const path = require('path')

module.exports = {
  // 选项...
  devServer: {
    disableHostCheck: true // 解决127.0.0.1指向其他域名时出现"Invalid Host header"问题
  },
  productionSourceMap: false,
  pluginOptions: {
    // 全局添加 less 变量，任何地方可以使用
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/styles/variable.less')]
    },
    // webpack打包可视化分析
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}
