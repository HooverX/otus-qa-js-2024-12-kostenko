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
    return {
      statusCode: response.statusCode,
      body: response.body
    }
  } catch (error) {
    return handleApiError(error)
  }
}

export async function post(endpoint, json) {
  try {
    console.log(`POST Request: ${config.url}${endpoint}, Body: ${JSON.stringify(json)}`)
    const response = await apiClient.post(endpoint, { json })
    return {
      statusCode: response.statusCode,
      body: response.body
    }
  } catch (error) {
    return handleApiError(error)
  }
}

export async function put(endpoint, json) {
  try {
    console.log(`PUT Request: ${config.url}${endpoint}, Body: ${JSON.stringify(json)}`)
    const response = await apiClient.put(endpoint, { json })
    return {
      statusCode: response.statusCode,
      body: response.body
    }
  } catch (error) {
    return handleApiError(error)
  }
}

export async function del(endpoint) {
  try {
    console.log(`DELETE Request: ${config.url}${endpoint}`)
    const response = await apiClient.delete(endpoint)
    return {
      statusCode: response.statusCode,
      body: response.body
    }
  } catch (error) {
    return handleApiError(error)
  }
}

function handleApiError(error) {
  console.error(`API Request failed: ${error.message}`)
  if (error.response) {
    return {
      statusCode: error.response.statusCode,
      body: error.response.body
    }
  }

  return {
    statusCode: 500,
    body: { message: 'Unexpected error' }
  }
}
