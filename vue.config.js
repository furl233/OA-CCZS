module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack(config) {
    const path = require('path')
    function resolve(dir) {
      return path.join(__dirname, dir)
    }
    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
            symbolId: 'icon-[name]'
        })
        .end()
  }
  
}