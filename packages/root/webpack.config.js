const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExternalTemplateRemotesPlugin = require('external-remotes-plugin');
var webpack = require('webpack');
const path = require('path');
const express = require('express');
function resolve(dir) {
  return path.join(__dirname, dir);
}

const deps = require('./package.json').dependencies;

const publicPath = '';

module.exports = (webpackConfigEnv, argv) => {
  const orgName = 'app';
  const projectName = 'root-config';
  const remotes = {};

  const isProd = argv && (argv.p || argv.mode === 'production');

  let plugins = [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static', to: 'static' },        
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      templateParameters: {
        isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
        orgName,
      },
      hash: true,
    }),
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(publicPath),
    }),
    new ExternalTemplateRemotesPlugin(),
  ];

  const mergedConfig = {
    mode: isProd ? 'production' : 'development',
    entry: path.resolve(process.cwd(), `src/${orgName}-${projectName}.ts`),
    output: {
      filename: `${orgName}-${projectName}.js`,      
      uniqueName: projectName,
      devtoolNamespace: `${projectName}`,
      publicPath: publicPath,
    },
    devServer: {
      port: 11443,
      open: true,
      hot: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      allowedHosts: 'all',
      client: {
        webSocketURL: 'auto://localhost:11443/ws',
        overlay: false,
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: {
            loader: require.resolve('babel-loader', { paths: [__dirname] }),
          },
        },
        {
          test: /\.css$/i,
          include: [/node_modules/, /src/],
          exclude: [/\.module\.css$/],
          use: [
            {
              loader: require.resolve('style-loader', { paths: [__dirname] }),
            },
            {
              loader: require.resolve('css-loader', { paths: [__dirname] }),
              options: {
                modules: false,
              },
            },
          ],
        },
        {
          test: /\.module\.css$/i,
          exclude: [/node_modules/],
          use: [
            {
              loader: require.resolve('style-loader', { paths: [__dirname] }),
            },
            {
              loader: require.resolve('css-loader', { paths: [__dirname] }),
              options: {
                modules: true,
              },
            },
          ],
        },
        {
          test: /\.(bmp|png|jpg|jpeg|gif|webp)$/i,
          exclude: /node_modules/,
          type: 'asset/resource',
        },
        // svg has its own loader to allow easier overriding (eg. svg-loader for React components)
        {
          test: /\.svg$/i,
          exclude: /node_modules/,
          type: 'asset/resource',
        },
        {
          test: /\.html$/i,
          exclude: [/node_modules/, /\.vue\.html$/],
          type: 'asset/source',
        },
      ],
    },
    devtool: 'source-map',
    optimization: {
      minimize: isProd,
    },
    experiments: {
      topLevelAwait: true,
    },
    externals: [],    
    plugins: plugins,
    resolve: {
      extensions: ['.mjs', '.js', '.jsx', '.wasm', '.json'],
      alias: {
        '@': resolve('src'),
      },
      fallback: { path: require.resolve('path-browserify') },
    },
  };

  return mergedConfig;
};
