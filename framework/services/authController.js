import { post } from './apiService2.js'

export async function createUser(username, password) {
  return await post('Account/v1/User', { userName: username, password })
}

export async function authorizeUser(username, password) {
  return await post('Account/v1/Authorized', { userName: username, password })
}

export async function generateToken(username, password) {
  return await post('Account/v1/GenerateToken', { userName: username, password })
}
