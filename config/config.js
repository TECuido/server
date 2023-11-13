require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || 'taylor',
    dbPassword: process.env.DB_PASSWORD || '1234',
    dbHost: process.env.DB_HOST || 'localhost',
    dbName: process.env.DB_NAME || 'swiftie',
    dbPort: process.env.DB_PORT || 5432,
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    keyId: process.env.KEY_ID,
    teamId: process.env.TEAM_ID,
    streamApiKey: process.env.STREAM_API_KEY,
    streamSecret: process.env.STREAM_SECRET
}

module.exports = config