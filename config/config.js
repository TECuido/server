require('dotenv').config()

const config = {
    env: process.env.NODE_ENV || 'dev',
    port: process.env.PORT || 3000,
    accessSecret: process.env.JWT_ACCESS_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    keyId: process.env.KEY_ID,
    teamId: process.env.TEAM_ID,
    mailerEmail: process.env.MAILER_EMAIL,
    mailerPassword: process.env.MAILER_PASSWORD
}

module.exports = config