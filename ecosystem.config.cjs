module.exports = {
  apps: [
    {
      name: "nova-logs",
      script: "dist/bot.js",
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
