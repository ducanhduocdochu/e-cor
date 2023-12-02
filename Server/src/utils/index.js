"use strict";

const _ = require("lodash");
const { Types } = require("mongoose");
const {google} = require('googleapis')
const nodemailer = require('nodemailer')

const convertToObjectIdMongodb = (id) => new Types.ObjectId(id);

const getInfoData = ({ filter = [], object = {} }) => {
  return _.pick(object, filter);
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

const removeUndefinedObject = (obj) => {
  Object.keys(obj).forEach((k) => {
    if (obj[k] == null) {
      delete obj[k];
    }
  });
  return obj;
};

const updateNestedObjectParser = (obj) => {
  const final = {};
  Object.keys(obj).forEach((k) => {
    if (typeof obj[k] === "object" && !Array.isArray(obj[k])) {
      const response = updateNestedObjectParser(obj[k]);
      Object.keys(response).forEach((a) => {
        final[`${k}.${a}`] = response[a];
      });
    } else {
      final[k] = obj[k];
    }
  });
  return final;
};

function padWithFs(inputString) {
  const maxLength = 24;
  const fsToAdd = maxLength - inputString.length;

  if (fsToAdd <= 0) {
    return inputString.slice(0, maxLength); // Nếu chuỗi đầu vào đã đủ dài, trả về nó
  } else {
    const fs = "f".repeat(fsToAdd); // Tạo chuỗi 'f' cần thêm
    return fs + inputString; // Đặt chuỗi 'f' phía trước chuỗi đầu vào
  }
}

const sendMail = async({email, otp}) => {
    const CLIENT_ID = process.env.EMAIL_CLIENT_ID
    const CLIENT_SECRET = process.env.EMAIL_CLIENT_SECRET
    const REDIRECT_URI = process.env.EMAIL_REDIRECT_URI
    const REFRESH_TOKEN = process.env.EMAIL_REFRESH_TOKEN

    const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI)
    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN})

    try{
        const access_token = await oAuth2Client.getAccessToken()
          
        const transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: 'OAuth2',
            user: 'wag0murad@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: access_token
          }
        });
        
        try {
          let info = await transport.sendMail({
            from: '"Đanh đẹp trai" <wag0murad@gmail.com>',
            to: email,
            subject: "Verify account",
            text: `Your authentication code is ${otp}`,
            html: `Your authentication code is ${otp}`
          });
          return info ? true: false
        } catch (error) {
          console.error("Error sending email:", error);
        }
    } catch(err){
        console.log(err)
    }
}

module.exports = {
  getInfoData,
  getSelectData,
  unGetSelectData,
  removeUndefinedObject,
  updateNestedObjectParser,
  convertToObjectIdMongodb,
  padWithFs,
  sendMail
};
