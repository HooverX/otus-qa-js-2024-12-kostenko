import got from 'got'
import config from '../config/testconfig'

const apiClient = got.extend({
  prefixUrl: config.url,
  headers: {
    'Content-Type': 'application/json'
  },
  responseType: 'json'
})

export async function get(endpoint) {
  try {
    console.log(`GET Request: ${config.url}${endpoint}`)

    const response = await apiClient.get(endpoint)
    return response.body
  } catch (error) {
    handleApiError(error)
  }
}

export async function post(endpoint, json) {
  try {
    console.log(`POST Request: ${config.url}${endpoint}, Body: ${JSON.stringify(json)}`)

    const response = await apiClient.post(endpoint, { json })
    return response.body
  } catch (error) {
    handleApiError(error)
  }
}

export async function put(endpoint, json) {
  try {
    console.log(`PUT Request: ${config.url}${endpoint}, Body: ${JSON.stringify(json)}`)

    const response = await apiClient.put(endpoint, { json })
    return response.body
  } catch (error) {
    handleApiError(error)
  }
}

export async function del(endpoint) {
  try {
    console.log(`DELETE Request: ${config.url}${endpoint}`)

    const response = await apiClient.delete(endpoint)
    return response.body
  } catch (error) {
    handleApiError(error)
  }
}

function handleApiError(error) {
  console.error(`API Request failed: ${error.message}`)
  if (error.response) {
    console.error(`Status: ${error.response.statusCode}`)
    console.error(`Response: ${JSON.stringify(error.response.body, null, 2)}`)
  }
  throw error
}
