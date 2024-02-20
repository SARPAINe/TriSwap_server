/* eslint-disable no-undef */
module.exports = {
  apps: [
    {
      name: "bcs-be-stg",
      script: "./build/index.js",
      env: {
        NODE_ENV: "staging",
        PORT: 3333
      },
      instances: 1,
      max_memory_restart: "300M",
      autorestart: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "logs/pm2-stg-error.log",
      out_file: "logs/pm2-stg-out.log",
      merge_logs: true,
    }
  ],
};
