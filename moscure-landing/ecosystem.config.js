// ecosystem.config.js — PM2 process manager config
// Run: pm2 start ecosystem.config.js
// To auto-start on server reboot: pm2 startup && pm2 save

module.exports = {
  apps: [
    {
      name: 'moscure-api',
      script: './server/index.js',
      cwd: '/var/www/moscure',   // Update to your EC2 deploy path
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
      // Logs
      error_file: '/var/log/moscure/api-error.log',
      out_file: '/var/log/moscure/api-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
