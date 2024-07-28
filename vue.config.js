const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const AutoImport = require('unplugin-auto-import/webpack').default;
const Components = require('unplugin-vue-components/webpack').default;
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: './build',
  publicPath: '/',
  assetsDir: 'static',
  devServer:{
    //  http://codercba.com:5000
    proxy:{
      '^/api':{
        target:'http://codercba.com:5000',
        pathRewrite:{
          '^/api':''
        },
        changeOrigin:true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'), // cli5 默认已配置
        components: '@/components',
        service: '@/service',
        views: '@/views',
        assets: '@/assets',
        common: '@/common',
        network: '@/network',
        store: '@/store',
        utils: '@/utils'
      },
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
  css: {
    loaderOptions: {
      less: {
        // 如果你使用的是 less-loader@5，请移除 lessOptions 这行，因为 lessOptions 在 less-loader@6+ 才开始支持
        lessOptions: {
          modifyVars: {
            // 自定义 less 变量，比如主题色 red
            'primary-color': '#f00',
            'link-color': '#1890ff',
            'border-radius-base': '2px',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
});
