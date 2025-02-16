import 'dotenv/config';

export const config = {
  baseURL: 'https://dummyjson.com',
  credentials: {
    username: process.env.TEST_DUMMY_JSON_USERNAME,
    password: process.env.TEST_DUMMY_JSON_PASSWORD
  }
};
