/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["tsx", "jsx"],
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      })
    );
    if (isServer) {
      require("./scripts/sitemap-generator.js");
    }
    return config;
  },
};

module.exports = nextConfig;
