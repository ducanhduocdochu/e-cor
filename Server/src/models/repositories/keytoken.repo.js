const KeyTokenModel = require("../keytoken.model");

const findTokenByUserId = async ({ user_id }) => {
  return await KeyTokenModel.findOne({ user_id }).lean();
};

const createKeyToken = async ({
  user_id,
  private_key,
  public_key,
  refresh_token,
}) => {
  const newToken = await KeyTokenModel.create({
    user_id,
    private_key,
    public_key,
    refresh_token,
  });
  return newToken;
};

const updateKeyTokenByUserId = async ({
  user_id,
  private_key,
  public_key,
  refresh_token,
}) => {
  const newToken = await KeyTokenModel.updateOne(
    {
      user_id,
    },
    {
      private_key,
      public_key,
      refresh_token,
    }
  );
  return newToken;
};

const removeKeyById = async ({ _id }) => {
  return KeyTokenModel.deleteOne({ _id }).lean();
};

const deleteKeyByUserId = async ({ user_id }) => {
  return await KeyTokenModel.deleteOne({ user_id }).lean();
};

const updateKeyById = async ({ refresh_token, key_token }) => {
  const newData = {
    ...key_token,
    refresh_token: refresh_token,
  };
  const result = await KeyTokenModel.updateOne(
    { _id: key_token.user_id },
    { $set: newData }
  );

  return result.upsertedCount;
};

const createOrUpdateKeyToken = async ({
  user_id,
  private_key,
  public_key,
  refresh_token,
}) => {
  const filter = { user_id };
  const update = {
    user_id,
    private_key,
    public_key,
    refresh_token,
  };
  const options = { upsert: true, new: true };

  const updatedToken = await KeyTokenModel.findOneAndUpdate(filter, update, options);

  return updatedToken;
};

module.exports = {
  findTokenByUserId,
  createKeyToken,
  removeKeyById,
  deleteKeyByUserId,
  updateKeyById,
  updateKeyTokenByUserId,
  createOrUpdateKeyToken
};
