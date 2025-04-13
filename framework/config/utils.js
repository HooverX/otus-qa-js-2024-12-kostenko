export function generateUsername() {
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercase = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'
  const symbols = '_-.@' // безопасные символы

  const getRandom = chars => chars[Math.floor(Math.random() * chars.length)]

  let username = [getRandom(uppercase), getRandom(lowercase), getRandom(digits), getRandom(symbols)]

  const allChars = uppercase + lowercase + digits + symbols
  while (username.length < 10) {
    username.push(getRandom(allChars))
  }

  return username.sort(() => Math.random() - 0.5).join('')
}
