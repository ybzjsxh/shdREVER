// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  // history: 'hash',
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        //dynamicImport: true,
        title: 'Shutdown v3.0',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
    ['@umijs/plugin-qiankun/slave'],
  ],
  base: '/shutdown',
  mountElementId: 'shutdown-root',
  // chainWebpack(config) {
  //   config.plugin('webpack-bundle-analyzer')
  //   .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  // },
  hash: true,
  //ssr: true,
  proxy: {
    '/shutdown/api': {
      target: 'http://localhost:8888',
      changeOrigin: true,
      // pathRewrite: { '^/shutdown': '' },
    },
  },
};
