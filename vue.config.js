module.exports = {
  devServer: {
    port: 1901
  },
  css: {
    extract: false
  },
  chainWebpack: (config) => {
    // this will pack Vue into the built library file
    config.externals.vue = false;

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with osk- as custom elements
          isCustomElement: tag => tag.startsWith('osk-'),
        }
      }))
  },
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      // exclude Vue from externals
      vue: false
    }
  }
}
