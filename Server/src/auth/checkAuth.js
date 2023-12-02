const JWT = require('jsonwebtoken');
const passport = require('passport');

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
};

const createApiKey = async (
    { _id, email, permissions }
) => {
    const userData = {
        _id, email, permissions
    }
    try {
        const apiKey = JWT.sign(userData, process.env.SECRETKEY);
        return apiKey
    } catch (error) {
        console.log(error);
    }
};

const decodeApiKey = async (
    apikey
) => {
    return await JWT.verify(apikey,  process.env.SECRETKEY);
};

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString();

        if (!key) {
            return res.json({
                message: 'Forbidden Error',
            });
        }
        apiKey = decodeApiKey(key)
        objKey = apiKey.permissions
        // Check objKey
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error',
            });
        }

        req.objKey = objKey;
        return next();
    } catch (error) {
        // Handle the error appropriately
    }
};

const permission = (requiredPermission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                message: 'Permission denied',
            });
        }

        const validPermission = req.objKey.permissions.includes(requiredPermission);

        if (!validPermission) {
            return res.status(403).json({
                message: 'Permission denied',
            });
        }

        return next();
    };
};

function authenticateGoogle(req, res, next) {
    passport.authenticate("google", (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = user;
      next();
    })(req, res, next);
  }

const checkTypeLogin = (req, res, next) =>{
    if (req.params.type != "default"){ 
        return res.status(403).json({
            message: 'Permission denied',
        });
    }
    return next()
}
  

module.exports = { apiKey, permission, createApiKey, decodeApiKey, authenticateGoogle, checkTypeLogin };
