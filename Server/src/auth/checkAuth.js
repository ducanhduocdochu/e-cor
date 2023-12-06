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
        const apiKey = await decodeApiKey(key)
        const permissions = apiKey.permissions
        if (!permissions) {
            return res.status(403).json({
                message: 'Forbidden Error',
            });
        }

        req.permissions = permissions;
        return next();
    } catch (error) {
        return next(error)
    }
};

const permission = (requiredPermission) => {
    return (req, res, next) => {
        if (!req.permissions) {
            return res.status(403).json({
                message: 'Permission denied',
            });
        }

        console.log(requiredPermission)
        console.log(req.permissions)

        const missingElements = requiredPermission.filter((element) => {
            return  !req.permissions.includes(element)
        });

        if (missingElements.length === 0){
            return next();
        }
        else{
            return res.status(403).json({
                message: 'Permission denied',
            });
        }


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
