import config from '../config/testconfig2.js'
import { createUser, authorizeUser, generateToken } from './authController.js'
import { setToken } from './apiService2.js'

export async function loginAndSetToken() {
  const { username, password } = config

  const createRes = await createUser(username, password)
  if (createRes.statusCode === 201 && createRes.body.userID) {
    config.userId = createRes.body.userID
    console.log(`User "${username}" created with ID: ${config.userId}`)
  } else if (createRes.statusCode === 406) {
    console.log(`ℹUser "${username}" already exists`)
  }

  const authRes = await authorizeUser(username, password)
  if (authRes.statusCode !== 200 || authRes.body !== true) {
    throw new Error(`Authorization failed for ${username}`)
  }

  const tokenRes = await generateToken(username, password)
  if (tokenRes.statusCode === 200 && tokenRes.body.token) {
    setToken(tokenRes.body.token)
    console.log('Token set successfully')

    console.log(`Using userId for requests: ${config.userId}`)
  } else {
    throw new Error('Token generation failed')
  }
}
