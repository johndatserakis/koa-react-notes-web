module.exports = {
  "extends": ["react-app", "airbnb"],
  "rules": {
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
    "no-param-reassign": 0,
    "react/jsx-one-expression-per-line": "off"
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [
          ["@", "./src/"],
        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      }
    }
  }
}
