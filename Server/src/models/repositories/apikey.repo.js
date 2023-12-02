const ApiKeyModel = require("../apikey.model");

const findApiKeyByUserId = async ({ user_id }) => {
    return await ApiKeyModel.findOne({ user_id }).lean();
  };

const createNewApiKey = async ({
  user_id,
  api_key
}) => {
  const newToken = await ApiKeyModel.create({
    user_id,
    api_key
  });
  return newToken;
};

const updateApiKeyByUserId = async ({
  user_id,
  api_key
}) => {
    return await ApiKeyModel.updateOne(
    {
      user_id,
    },
    {
        api_key
    }
  );
};

const deleteApiKeyByUserId = async ({ user_id }) => {
  return await ApiKeyModel.deleteOne({ user_id }).lean();
};

const createOrUpdateApiKey = async ({
  user_id,
  api_key
}) => {
  const filter = { user_id };
  const update = {
    api_key
  };
  const options = { upsert: true, new: true };

  const updatedApiKey = await ApiKeyModel.findOneAndUpdate(filter, update, options);

  return updatedApiKey;
};

module.exports = {
    findApiKeyByUserId,
    createNewApiKey,
    updateApiKeyByUserId,
    deleteApiKeyByUserId,
    createOrUpdateApiKey
};
