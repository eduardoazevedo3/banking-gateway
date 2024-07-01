export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_DATABASE,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
  },
});
