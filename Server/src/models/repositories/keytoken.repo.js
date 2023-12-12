const KeyTokenModel = require("../keytoken.model");

const findTokenByUserId = async ({ _id }) => {
  return await KeyTokenModel.findOne({ _id }).lean();
};

const createKeyToken = async ({
  _id,
  private_key,
  public_key,
  refresh_token,
}) => {
  const newToken = await KeyTokenModel.create({
    _id,
    private_key,
    public_key,
    refresh_token,
  });
  return newToken;
};

const updateKeyTokenByUserId = async ({
  _id,
  private_key,
  public_key,
  refresh_token,
}) => {
  const newToken = await KeyTokenModel.updateOne(
    {
      _id,
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

const deleteKeyByUserId = async ({ _id }) => {
  return await KeyTokenModel.deleteOne({ _id }).lean();
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
  _id,
  private_key,
  public_key,
  refresh_token,
}) => {
  const filter = { _id };
  const update = {
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
