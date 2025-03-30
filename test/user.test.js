import config from '../framework/config/testconfig'
import { create, login, getUser, updateUser, deleteUser } from '../framework/services/userService'

describe('Auth', () => {
  it('Create user', async () => {
    const response = await create({
      id: config.userId,
      username: config.username,
      password: config.password
    })

    expect(response).toHaveProperty('statusCode', 200, `Expected status 200 on user creation for ${config.username}`)
  })

  it('Success login', async () => {
    const response = await login({
      username: config.username,
      password: config.password
    })

    expect(response.statusCode).toBe(
      200,
      `Expected successful login for ${config.username}, got ${response.statusCode}`
    )
  })

  it('User Found', async () => {
    const response = await getUser(config.username)
    expect(response.statusCode).toBe(200, `Expected user ${config.username} to be found, got ${response.statusCode}`)
  })

  it('User Not Found', async () => {
    const response = await getUser('suchusernotfound')
    expect(response.statusCode).toBe(404, `Expected 404 for non-existent user, got ${response.statusCode}`)
  })

  it('Update username', async () => {
    const response = await updateUser(config.username, {
      id: config.userId,
      username: config.newusername,
      userStatus: 1
    })

    expect(response.statusCode).toBe(
      200,
      `Expected successful username update to ${config.newusername}, got ${response.statusCode}`
    )
  })

  it('Success login_new', async () => {
    const response = await login({
      username: config.newusername,
      password: config.password
    })

    expect(response.statusCode).toBe(
      200,
      `Expected login success for updated user ${config.newusername}, got ${response.statusCode}`
    )
  })

  it('Delete user', async () => {
    const response = await deleteUser(config.newusername)
    expect(response.statusCode).toBe(
      200,
      `Expected user ${config.newusername} to be deleted, got ${response.statusCode}`
    )
  })

  it('Delete user not found', async () => {
    const response = await deleteUser('testuserfordelete')
    expect(response.statusCode).toBe(404, `Expected 404 for deleting non-existent user, got ${response.statusCode}`)
  })
})
