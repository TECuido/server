require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER || 'taylor',
    dbPassword: process.env.DB_PASSWORD || '1234',
    dbHost: process.env.DB_HOST || 'localhost',
    dbName: process.env.DB_NAME || 'swiftie',
    dbPort: process.env.DB_PORT || 5432,
    databaseURL: `postgresql://${dbName}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?schema=public`
}

module.exports = {config}