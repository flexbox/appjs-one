module.exports = function withMySDK(config, { apiKey }) {
  // ensurre the bojects exitcs
  if (!config.ios) {
    config.ios = {};
  }
  if (!config.ios.infoPlist) {
    config.ios.infoPlist = {};
  }

  // Append the apiKey
  config.ios.infoPlist["MY_CUSTOM_IOS_API_KEY"] = apiKey;

  return config;
};
