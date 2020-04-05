const path = require("path");
const CracoAntDesignPlugin = require("craco-antd");

module.exports = {
  plugins: [
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          "@primary-color": "#135edb", // primary color for all components
          "@link-color": "#135edb", // link color
          "@success-color": "#16ca43", // success state color
          "@warning-color": "‎#FFFF00", // warning state color
          "@error-color": "#fb1505", // error state color
          "@font-size-base": "16px", // major text font size
          "@heading-color": "rgba(0, 0, 0, 0.85)", // heading text color
          "@text-color": "rgba(0, 0, 0, 0.65)", // major text color
          "@text-color-secondary": "rgba(0, 0, 0, 0.45)", // secondary text color
          "@disabled-color": "rgba(0, 0, 0, 0.25)", // disable state color
          "@border-radius-base": "4px", // major border radius
          "@border-color-base": "#dee2e6", // major border color
          "@box-shadow-base": "0 2px 8px rgba(0, 0, 0, 0.15)", // major shadow for layers
        },
      },
    },
  ],
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
};
