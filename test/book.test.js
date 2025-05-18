import config from '../framework/config/testconfig2.js'
import { createBook, updateBook, getBook, deleteBook } from '../framework/services/bookController.js'
import { createUser, generateToken, authorizeUser } from '../framework/services/authController.js'
import { setToken } from '../framework/services/apiService2.js'

function logRequestAndResponse(action, requestData, response) {
  console.log(`${action} Request Data:`, requestData)
  console.log(`${action} Response:`, response)
}

beforeAll(async () => {
  console.log('Logging in and setting token...')
  try {
    console.log('Starting login process...')

    const createRes = await createUser(config.username, config.password)
    logRequestAndResponse('Create User', { userName: config.username, password: config.password }, createRes)

    if (createRes.statusCode === 201 && createRes.body.userID) {
      config.userId = createRes.body.userID
      console.log(`User "${config.username}" created with ID: ${config.userId}`)
    } else if (createRes.statusCode === 406) {
      console.log(`User "${config.username}" already exists`)
    }

    const tokenRes = await generateToken(config.username, config.password)
    logRequestAndResponse('Generate Token', { userName: config.username, password: config.password }, tokenRes)

    if (tokenRes.statusCode === 200 && tokenRes.body.token) {
      setToken(tokenRes.body.token)
      config.token = tokenRes.body.token
      console.log('Token set successfully:', config.token)
    } else {
      throw new Error('Token generation failed')
    }

    const authRes = await authorizeUser(config.username, config.password)
    logRequestAndResponse('Authorize User', { userName: config.username, password: config.password }, authRes)

    if (authRes.statusCode !== 200 || authRes.body !== true) {
      throw new Error(`Authorization failed for ${config.username}`)
    }
  } catch (error) {
    console.error('Error during login:', error)
    throw error
  }
})

afterAll(async () => {
  console.log('Cleaning up after tests...')
})

describe('BookStore API Tests', () => {
  it('Create Book', async () => {
    try {
      console.log('Token being used for Create Book:', config.token)

      const response = await createBook(config.userId, config.isbn, config.token)
      logRequestAndResponse(
        'Create Book',
        {
          userId: config.userId,
          isbn: config.isbn,
          token: config.token
        },
        response
      )

      expect(response.statusCode).toBe(201)
    } catch (error) {
      console.error('Error during Create Book:', error)
      throw error
    }
  })

  it('Get Book Info', async () => {
    try {
      const response = await getBook(config.isbn, config.token)
      logRequestAndResponse('Get Book Info', { isbn: config.isbn, token: config.token }, response)

      expect(response.statusCode).toBe(200)
      expect(response.body.isbn).toBe(config.isbn)
    } catch (error) {
      console.error('Error during Get Book Info:', error)
      throw error
    }
  })

  it('Update Book', async () => {
    try {
      const response = await updateBook(config.userId, config.isbn, config.newIsbn, config.token)
      logRequestAndResponse(
        'Update Book',
        {
          userId: config.userId,
          oldIsbn: config.isbn,
          newIsbn: config.newIsbn,
          token: config.token
        },
        response
      )

      expect(response.statusCode).toBe(200)
    } catch (error) {
      console.error('Error during Update Book:', error)
      throw error
    }
  })

  it('Delete Book', async () => {
    try {
      const response = await deleteBook(config.userId, config.newIsbn, config.token)
      logRequestAndResponse(
        'Delete Book',
        { userId: config.userId, isbn: config.newIsbn, token: config.token },
        response
      )

      expect(response.statusCode).toBe(204)
    } catch (error) {
      console.error('Error during Delete Book:', error)
      throw error
    }
  })
})
