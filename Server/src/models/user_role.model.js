const { model, Schema } = require('mongoose');

const DOCUMENT_NAME = 'UserRole';
const COLLECTION_NAME = 'UserRoles';

const UserRoleSchema = new Schema({
    user_id: {
        type: String,
        unique: true,
        required: true,
    },
    is_user: {
        type: Boolean,
        default: true
    },
    is_shop: {
        type: Boolean,
        default: false
    },
    is_admin: {
        type: Boolean,
        default: false
    },
    is_delivery_person: {
        type: Boolean,
        default: false
    },
    is_supplier: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
});

const UserRoleModel = model(DOCUMENT_NAME, UserRoleSchema);

module.exports = UserRoleModel
