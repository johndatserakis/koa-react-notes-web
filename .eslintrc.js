module.exports = {
  "extends": [
    "react-app",
    "airbnb",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    ],
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
    "react/jsx-one-expression-per-line": "off",
    "operator-linebreak": ["error", "after", { "overrides": { "??": "ignore", ":": "ignore" } }],
    "jsx-a11y/label-has-associated-control": [ 2, {
      "labelComponents": ["label"],
      "labelAttributes": ["htmlFor"],
      "controlComponents": ["Text"]
    }],
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
    "react/jsx-curly-newline": "off",
    "consistent-return": 0,
    "indent": "off",
    "operator-linebreak": "off",
    "eqeqeq": ["error", "always", {"null": "ignore"}]
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
