const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'UserInfo';
const COLLECTION_NAME = 'UserInfos';

const UserInfoSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },
    delivery: {
        type: String,
    },
    phone: {
        type: String,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

const userInfoModel = model(DOCUMENT_NAME, UserInfoSchema);

module.exports = userInfoModel
