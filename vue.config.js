const webpack = require("webpack");
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

// ref. https://cli.vuejs.org/config/#vue-config-js
module.exports = {
  lintOnSave: true,
  css: {
    sourceMap: true,
    loaderOptions: {
      // 預先載入的全域共用scss
      sass: {
        data: `
          @import "@/assets/scss/main.scss";
        `
        // ref. https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options =>
        Object.assign(options, {
          transformAssetUrls: {
            audio: "src"
          }
        })
      );
  },
  productionSourceMap: false,
  configureWebpack: {
    output: {
      filename: "[name].[hash].js"
    },
    optimization: {
      minimizer: [
        ...(isDev
          ? []
          : [
            // new UglifyJsPlugin({
            //   uglifyOptions: {
            //     compress: {
            //       warnings: false,
            //       drop_console: true
            //     }
            //   },
            //   sourceMap: true
            // })
            // ref. https://webpack.js.org/configuration/optimization/#optimization-minimizer
          ])
      ]
    },
    plugins: [
      ...(isDev
        ? []
        : [new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /zh|en/)]),
    ]
  }
};
