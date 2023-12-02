const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    verify: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: ["default", "google", "facebook"],
        default: "default"
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

const UserModel = model(DOCUMENT_NAME, UserSchema);

module.exports = UserModel
