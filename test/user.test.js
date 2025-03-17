import { get, post, put, del, config } from '../framework/services/apiService'

describe('Auth', () => {
  it('Register', async () => {
    const response = await post('v2/user', {
      id: config.userid,
      username: config.username,
      password: config.password,
      userStatus: 0
    })

    expect(response).toHaveProperty('statusCode', 200)
    expect(response.body.message).toBe(config.username)
  })

  it('Success login', async () => {
    const response = await post('v2/user/login', {
      username: config.username,
      password: config.password
    })

    expect(response.statusCode).toBe(200)
  })

  it('User Found', async () => {
    const response = await get(`v2/user/${config.username}`)
    expect(response.statusCode).toBe(200)
  })

  it('User Not Found', async () => {
    const response = await get('v2/user/suchusernotfound')
    expect(response.statusCode).toBe(404)
  })

  it('Update username', async () => {
    const response = await put(`v2/user/${config.username}`, {
      username: config.newusername
    })

    expect(response).toHaveProperty('statusCode', 200)
  })

  it('Delete user', async () => {
    const response = await del(`v2/user/${config.newusername}`)
    expect(response.statusCode).toBe(200)
  })

  it('Delete user not found', async () => {
    const response = await del('v2/user/testuserfordelete')
    expect(response.statusCode).toBe(404)
  })
})
