module.exports = {
  "extends": ["react-app", "airbnb"],
  "rules" : {
      "indent": ["error", 2],
      "prefer-const": ["error"],
      "no-const-assign": ["error"],
      "semi": 2,
      "comma-dangle": ["error"],
      "quotes": ["error", "double"],
      "import/prefer-default-export": "off",
      "import/no-default-export": "error",

  },
  // settings: {
  //   "import/resolver": {
  //     typescript: {} // this loads <rootdir>/tsconfig.json to eslint
  //   },
  // },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src/"],
          // ["babel-polyfill", "babel-polyfill/dist/polyfill.min.js"],
          // ["helper", "./utils/helper"],
          // ["material-ui/DatePicker", "../custom/DatePicker"],
          // ["material-ui", "material-ui-ie10"],
        ],
        extensions: [".ts", ".js", ".jsx", ".json"]
      }
    }
  }
}
