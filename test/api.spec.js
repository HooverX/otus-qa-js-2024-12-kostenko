const request = require('supertest')

const baseURL = 'https://bookstore.demoqa.com'

function generateUserName() {
  const prefix = 'user_'
  const randomSuffix = Math.random().toString(36).substring(2, 8)
  return prefix + randomSuffix
}
describe('API тесты', () => {
  it('Генерация токена с некорректными учетными данными (ошибка)', async () => {
    const response = await request(baseURL).post('/Account/v1/GenerateToken').send({
      userName: 'invalid_username',
      password: 'invalid_password'
    })

    console.log(response.body)

    expect(response.body.status).toBe('Failed')
    expect(response.body.result).toBe('User authorization failed.')
  })

  it('Генерация токена с корректными учетными данными (успешно)', async () => {
    const response = await request(baseURL).post('/Account/v1/GenerateToken').send({
      userName: 'testik',
      password: 'Testik111!'
    })

    console.log(response.body)

    expect(response.body.status).toBe('Success')
    expect(response.body).toHaveProperty('token')
    expect(response.body).toHaveProperty('expires')
  })

  it('Создание пользователя c ошибкой, логин уже используется', async () => {
    const response = await request(baseURL).post('/Account/v1/User').send({
      userName: 'testik',
      password: 'Testik111!'
    })

    console.log(response.body)

    expect(response.body).toHaveProperty('message', 'User exists!')
  })

  it('Создание пользователя c ошибкой, пароль не подходит', async () => {
    const response = await request(baseURL).post('/Account/v1/User').send({
      userName: 'testik',
      password: 'Testik'
    })

    console.log(response.body)

    expect(response.body).toHaveProperty(
      'message',
      "Passwords must have at least one non alphanumeric character, one digit ('0'-'9'), one uppercase ('A'-'Z'), one lowercase ('a'-'z'), one special character and Password must be eight characters or longer."
    )
  })

  it('Создание пользователя успешно', async () => {
    const response = await request(baseURL).post('/Account/v1/User').send({
      userName: generateUserName(),
      password: 'Testik333!'
    })

    console.log(response.body)

    expect(response.body).toHaveProperty('userID')
    expect(response.body).toHaveProperty('username')
  })
})
