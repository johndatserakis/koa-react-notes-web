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
      "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".ts"] }],
      "max-len": 0,
      "react/no-unescaped-entities": 0,
      "import/extensions": [
         "error",
         "ignorePackages",
         {
           "js": "never",
           "jsx": "never",
           "ts": "never",
           "tsx": "never"
         }
      ],
      "no-param-reassign": 0
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
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
      }
    }
  }
}
