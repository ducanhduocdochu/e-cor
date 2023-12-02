'use strict';

const dev = {
    app: { port: process.env.APP_PORT || 3000 },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '27017',
        username: process.env.DB_USERNAME || undefined,
        password: process.env.DB_PASSWORD || undefined,
        db_name: process.env.DB_NAME || undefined,
    },
};

const pro = {
    app: { port: process.env.APP_PORT || 3000 },
    db: {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '27017',
        username: process.env.DB_USERNAME || undefined,
        password: process.env.DB_PASSWORD || undefined,
        db_name: process.env.DB_NAME || undefined,
    },
};

const config = { dev, pro };

const env = process.env.NODE_ENV || 'dev';

module.exports = config[env];
