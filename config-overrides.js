  /* config-overrides.js */
  const { useBabelRc, override, addLessLoader } = require('customize-cra')

  module.exports = override(
    useBabelRc(),
    addLessLoader({
      javascriptEnabled: true,
    })
  );  