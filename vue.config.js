const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: process.env.VUE_APP_API_URL, //'http://blog-vue.local',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
