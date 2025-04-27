import { generateUsername } from './utils.js'

export default {
  baseUrl: 'https://bookstore.demoqa.com',
  username: generateUsername(),
  password: 'Testuser1234!',
  token: '', // будет автоматически обновлён
  isbn: '9781449325862',
  newIsbn: '9781491950296'
  //  userId: 'ccc5c17c-c3a0-4efc-85ed-3cfafc3b41b1'
}
