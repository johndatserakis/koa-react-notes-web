module.exports = {
  "extends": "stylelint-config-recommended-scss",
  "plugins": ["stylelint-order", "stylelint-scss", "stylelint-declaration-strict-value"],
  "rules": {
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "color-no-invalid-hex": true,
    "declaration-no-important": true,
    "font-weight-notation": "numeric",
    "function-url-quotes": "always",
    "indentation": 2,
    "no-duplicate-selectors": true,
    "number-leading-zero": "always",
    "order/order": ["custom-properties", "declarations"],
    "order/properties-alphabetical-order": true,
    "scale-unlimited/declaration-strict-value": [["/color/"], {
      "ignoreKeywords": ["currentColor", "transparent", "inherit"]
    }],
    "selector-max-id": 0,
    "string-quotes": "double",
    "declaration-colon-space-after": "always",
    "declaration-colon-space-before": "never",
    "selector-pseudo-class-no-unknown": [ true, {
      "ignorePseudoClasses": [
        "export",
        "import",
        "global",
        "local"
      ]
    }],
  }
}
