describe('Auth', () => {
  let token

  it('Success login', async () => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'emilys',
        password: 'emilyspass',
        expiresInMins: 30
      })
    })

    const data = await response.json()

    expect(response.status).toEqual(200)
    expect(data.username).toBe('emilys')
    expect(data.accessToken).toBeTruthy()
    token = data.accessToken
    console.log(token)
  })
})
