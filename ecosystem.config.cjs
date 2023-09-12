module.exports = {
  apps : [{
    name   : "nova-logs",
    script : "dist/server.js",
    env_production: {
      NODE_ENV: "production",
    },
  }]
}
