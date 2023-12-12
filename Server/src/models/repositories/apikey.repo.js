const ApiKeyModel = require("../apikey.model");

const findApiKeyByUserId = async ({ _id }) => {
    return await ApiKeyModel.findOne({ _id }).lean();
  };

const createNewApiKey = async ({
  _id,
  api_key
}) => {
  const newToken = await ApiKeyModel.create({
    _id,
    api_key
  });
  return newToken;
};

const updateApiKeyByUserId = async ({
  _id,
  api_key
}) => {
    return await ApiKeyModel.updateOne(
    {
      _id,
    },
    {
        api_key
    }
  );
};

const deleteApiKeyByUserId = async ({ _id }) => {
  return await ApiKeyModel.deleteOne({ _id }).lean();
};

const createOrUpdateApiKey = async ({
  _id,
  api_key
}) => {
  const filter = { _id };
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
