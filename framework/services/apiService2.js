import got from 'got'
import config from '../config/testconfig2.js'

let token = ''

export function setToken(newToken) {
  token = newToken
}

const apiClient = got.extend({
  prefixUrl: config.baseUrl,
  responseType: 'json',
  hooks: {
    beforeRequest: [
      options => {
        options.headers['Content-Type'] = 'application/json'
        if (token) {
          options.headers['Authorization'] = `Bearer ${token}`
        }
        console.log('Request Headers:', options.headers)
      }
    ]
  }
})

export async function get(endpoint) {
  try {
    const res = await apiClient.get(endpoint)
    return { statusCode: res.statusCode, body: res.body }
  } catch (error) {
    return handleError(error)
  }
}

export async function post(endpoint, json) {
  try {
    const res = await apiClient.post(endpoint, { json })
    return { statusCode: res.statusCode, body: res.body }
  } catch (error) {
    return handleError(error)
  }
}

export async function put(endpoint, json) {
  try {
    const res = await apiClient.put(endpoint, { json })
    return { statusCode: res.statusCode, body: res.body }
  } catch (error) {
    return handleError(error)
  }
}

export async function del(endpoint) {
  try {
    const res = await apiClient.delete(endpoint)
    return { statusCode: res.statusCode, body: res.body }
  } catch (error) {
    return handleError(error)
  }
}

function handleError(error) {
  return {
    statusCode: error.response?.statusCode || 500,
    body: error.response?.body || { message: error.message }
  }
}
