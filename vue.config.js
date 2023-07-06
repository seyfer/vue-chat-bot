function enableShadowCss(config) {
  const configs = [
    config.module.rule('vue').use('vue-loader'),
  ];

  // based on common rules returned by `vue inspect`
  const ruleSets = ['css', 'postcss', 'scss', 'sass', 'less', 'stylus'];
  const ruleNames = ['vue-modules', 'vue', 'normal-modules', 'normal'];

  ruleSets.forEach((ruleSet) => {
    if (config.module.rules.store.has(ruleSet)) {
      ruleNames.forEach((rName) => {
        if (config.module.rule(ruleSet).oneOfs.store.has(rName)) {
          if (config.module.rule(ruleSet).oneOf(rName).uses.store.has('vue-style-loader')) {
            configs.push(config.module.rule(ruleSet).oneOf(rName).use('vue-style-loader'));
          }
        }
      });
    }
  });

  if (!process.env.BUILD_MODE) {
    process.env.BUILD_MODE = config.store.get('mode');
  }

  configs.forEach((c) => c.tap((options) => {
    options.shadowMode = true;
    return options;
  }));
}

module.exports = {
  devServer: {
    port: 1901
  },
  css: {
    extract: false
  },
  chainWebpack: (config) => {
    // this will pack Vue into the built library file
    // it is done with --inline-vue now
    // config.externals.vue = false;

    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with osk- as custom elements
          isCustomElement: tag => tag.startsWith('osk-'),
        },
        customElement: process.env.NODE_ENV !== 'development'
      }))

    process.env.NODE_ENV !== 'development' && enableShadowCss(config);
  },
  productionSourceMap: false,
}
