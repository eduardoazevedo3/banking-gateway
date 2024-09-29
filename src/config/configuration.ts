export default () => ({
  app: {
    env: process.env.NODE_ENV || 'development',
    debug: process.env.APP_DEBUG === 'true',
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  database: {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
  },
  banking: {
    bancoBrasil: {
      appKey: process.env.BB_APP_KEY,
      clientId: process.env.BB_CLIENT_ID,
      clientSecret: process.env.BB_CLIENT_SECRET,
    },
  },
});
