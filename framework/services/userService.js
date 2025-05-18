import { get, post, put, del } from '../services/apiService'

export async function create({ id, username, password, userStatus = 0 }) {
  return await post('v2/user', { id, username, password, userStatus })
}

export async function login({ username, password }) {
  const query = `v2/user/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
  return await get(query)
}

export async function getUser(username) {
  return await get(`v2/user/${username}`)
}

export async function updateUser(username, data) {
  return await put(`v2/user/${username}`, data)
}

export async function deleteUser(username) {
  return await del(`v2/user/${username}`)
}
