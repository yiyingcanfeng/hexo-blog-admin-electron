const path = require('path')

module.exports = {
  lintOnSave: false
}

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: './',
  devServer: {
    // can be overwritten by process.env.HOST
    host: '0.0.0.0',
    port: 8165
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('components', resolve('src/components'))

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
  },
  // 设置APP及安装包图标
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: './public/logo.ico'
        },
        mac: {
          icon: './public/logo.png'
        },
        productName: 'hexo-blog-admin-electron',
      }
    }
  }
}
