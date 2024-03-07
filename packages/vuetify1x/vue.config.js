const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
function resolve(dir) {
  return path.join(__dirname, dir);
}
const moduleName = `vuetify1x`;
const timestamp = new Date().toISOString();
module.exports = defineConfig({
  transpileDependencies: true,
  runtimeCompiler: true,
  publicPath: 'auto',
  filenameHashing: false,
  css: {
    extract: false,
  },
  devServer: {
    port: 11001,
    hot: false,
    open: false,
    client: {
      overlay: false,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  configureWebpack: {
    optimization: {
      minimize: isProd,
      runtimeChunk: false, // This is also needed, but was added in the original question as well
      splitChunks: false,
    },
    resolve: {
      alias: {
        '@': resolve('src'),
      },
      fallback: { path: require.resolve('path-browserify') },
    },
    output: {
      libraryTarget: 'commonjs',
    },
    experiments: {
      topLevelAwait: true,
    },
    plugins: [
      new ModuleFederationPlugin({
        name: moduleName,
        filename: 'remoteEntry.js',
        remotes: {},
        exposes: {
          './ApplicationPage': `./src/main.js?t=${timestamp}`,
        },
      }),
      new ExternalTemplateRemotesPlugin(),
    ],
  },
  chainWebpack: config => {
    // initialize vue loader (looks like needed for import w/o extensions)
    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('vue-loader')
      .tap(options => {
        options.prettify = false;
        return options;
      });

    // initialize js loader (looks like needed for import w/o extensions)
    config.module.rule('js').test(/\.js$/).use('babel-loader');

    // finalizing support for import w/o extensions
    /* eslint-disable newline-per-chained-call */
    config.resolve.extensions.clear().add('.vue').add('.js').add('.json');

    // support for static as "public" directory of vue cli
    config.plugin('html').tap(args => {
      args[0].template = path.resolve('public/index.html');
      return args;
    });

  },
})
