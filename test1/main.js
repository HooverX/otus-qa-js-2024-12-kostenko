// const config = require('../framework/config/testconfig')
const fetch = require('node-fetch')

describe('Auth', () => {
  it('User Found', async () => {
    const response = await fetch(`https://petstore.swagger.io/v2/user/User1`)

    const status = response.status

    expect(status).toBe(200)
  })
})
