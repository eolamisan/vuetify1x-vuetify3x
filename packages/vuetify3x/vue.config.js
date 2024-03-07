const { ModuleFederationPlugin } = require('webpack').container;
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
function resolve(dir) {
  return path.join(__dirname, dir);
}

const moduleName = `vuetify3x`;
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
    port: 11002,
    hot: false,
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

    config.plugin('feature-flags').tap(args => {
      args[0].__VUE_OPTIONS_API__ = JSON.stringify(true);
      args[0].__VUE_PROD_DEVTOOLS__ = JSON.stringify(false);
      args[0].__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = JSON.stringify(false);
      return args
    })
  },
})
