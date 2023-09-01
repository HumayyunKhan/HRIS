export default (): any => ({
  env: process.env.NODE_ENV,
  port: process.env.APP_PORT,
  defaultLanguage: process.env.DEFAULT_LANGUAGE,
  corsWhitelist: process.env.CORS_WHITELIST,

  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },

  jwt: {
    secretKey: process.env.JWT_SECRET_KEY,
    accessTokenExpiresInSec: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRY_IN_SEC, 10),
  },
});
