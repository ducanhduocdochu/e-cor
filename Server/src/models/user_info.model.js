const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'UserInfo';
const COLLECTION_NAME = 'UserInfos';

const UserInfoSchema = new Schema({
    address: {
        type: Array,
        default: []
    },
    image: {
        type: String,
        default: ""
    },
    delivery_address: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

const userInfoModel = model(DOCUMENT_NAME, UserInfoSchema);

module.exports = userInfoModel
