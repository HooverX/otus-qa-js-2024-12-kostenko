/* eslint-disable prettier/prettier */
require('dotenv').config()

const config = {
  userId: process.env.Testuserid,
  username: process.env.Testusername,
  newUsername: process.env.Testnewusername,
  password: process.env.Testpassword,
  url: process.env.Testurl,
};

module.exports = config