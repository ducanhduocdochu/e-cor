const mongoose = require("mongoose");
const { countConnect } = require('../helper/check.connect');
const {db} = require('../configs/config.db');
const connectString = `mongodb://${db.host}:${db.port}/${db.db_name}`;

class Database {
    constructor() {
        this.connect();
    }

    connect(type = 'mongodb') {
        if (type === 'mongodb') {
            // Debug
            if (1 === 0) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true });
            }

            const options = {
                maxPoolSize: 50,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };

            mongoose.connect(connectString, options)
                .then(_ => console.log(`Connected Mongodb Success`), countConnect)
                .catch(err => console.log('Error Connect', err));
        }
    }

    static getInstance(_type) {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}

const instanceMongodb = Database.getInstance('mongodb');
module.exports = instanceMongodb;
