// vue.config.js
const path  = require('path');
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...

    }
    return {
      resolve:{
        alias:{
          // 可以使用@js来代替这个路径的文件
          '@js': path.resolve(__dirname, './src/assets/js'),
          '@css': path.resolve(__dirname, './src/assets/css'),
          '@img': path.resolve(__dirname, './src/assets/img'),
          '@c': path.resolve(__dirname, './src/components'),
        }
      }
    }
  }
}