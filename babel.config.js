module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // plugins: [], // Remove or keep empty if no other plugins are used
  };
};
