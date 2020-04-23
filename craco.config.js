const path = require("path");
const StyleLintPlugin = require("stylelint-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  style: {
    // https://github.com/gsoft-inc/craco/blob/master/recipes/set-css-loader-locals-convention/craco.config.js
    css: {
      loaderOptions: {
        localsConvention: "camelCase",
      },
    },
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    plugins: [
      // https://github.com/gsoft-inc/craco/blob/master/recipes/add-stylelint/craco.config.js
      new StyleLintPlugin({
        configBasedir: __dirname,
        context: path.resolve(__dirname, "src"),
        files: ["**/*.scss"],
      }),
      // new BundleAnalyzerPlugin(),
    ],
  },
  jest: {
    configure: {
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
    },
  },
};
