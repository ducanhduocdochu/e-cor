const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const passport = require("passport");
const { createOrUpdateUser } = require("./models/repositories/user.repo");
const { convertToObjectIdMongodb, padWithFs } = require("./utils");
const AccessService = require("./services/access.service");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/v1/api/access/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      return cb(null, await AccessService.loginGoogle({profile}));
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: "https://www.example.com/oauth2/redirect/facebook",
//       profileFields: ["email", "photos", "id", "displayName"],
//     },
//     async function (accessToken, refreshToken, profile, cb) {
//       try {
//         console.log(profile)
//         const response = await createOrUpdateUser({
//           _id: convertToObjectIdMongodb(padWithFs(profile.id)),
//           email: `__${profile.emails[0].value}`,
//           username: profile.displayName,
//           password: "123456789",
//           verify: profile.emails[0].verified,
//           type: "google",
//         });

//         return cb(null, response);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   )
// );
