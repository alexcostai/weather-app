module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      [
        "module-resolver",
        {
          alias: {
            components: "./components",
            hooks: "./hooks",
            assets: "./assets",
            helpers: "./helpers",
            styles: "./styles",
            services: "./services",
            constants: "./constants",
            store: "./store",
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env",
        },
      ],
    ],
  };
};
