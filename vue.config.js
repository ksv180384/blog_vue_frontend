const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3011,
    proxy: {
      '^/api': {
        //target: process.env.VUE_APP_API_URL, //'http://blog-vue.local',
        target: 'https://site5.ksv-test.ru',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
