// function 1
import { nameIsValid, fullTrim, getTotal } from '../src/app'

describe('nameIsValid', () => {
  it('returns true for valid name "zxc"', () => {
    expect(nameIsValid('zxc')).toBe(true)
  })

  it.each([
    ['alice', true],
    ['bob', true],
    ['a1ice', false],
    ['123', false],
    ['', false],
    ['xy', true],
    ['XZ', false]
  ])('validate', (name, expected) => {
    expect(nameIsValid(name)).toBe(expected)
  })

  it('returns false for a non-string input', () => {
    expect(nameIsValid(123)).toBe(false)
    expect(nameIsValid(['арбуз'])).toBe(false)
    expect(nameIsValid({})).toBe(false)
    expect(nameIsValid(null)).toBe(false)
    expect(nameIsValid(undefined)).toBe(false)
  })
})
// function 2
it('delete spaces from string', () => {
  const input = 'hello world'
  const expected = 'helloworld'
  const result = fullTrim(input)
  expect(result).toBe(expected)
})

it.each([
  [' hello world ', 'helloworld'],
  ['no spaces', 'nospaces'],
  [' multiple   spaces ', 'multiplespaces'],
  [' s p a c e s ', 'spaces'],
  ['', ''], // Тест на пустую строку
  [null, ''], // Тест на null
  [undefined, ''] // Тест на undefined
])('Проверка удаления пробелов', (input, expected) => {
  expect(fullTrim(input)).toBe(expected)
})

describe('Тесты для функции fullTrim', () => {
  test('Возвращает пустую строку для null или undefined', () => {
    expect(fullTrim(null)).toBe('')
    expect(fullTrim(undefined)).toBe('')
  })
})
// function 3
test('Рассчитывает итоговую сумму без скидки', () => {
  const items = [
    { price: 10, quantity: 3 },
    { price: 20, quantity: 2 }
  ]
  const result = getTotal(items)
  expect(result).toBe(70) // Проверяем, что итоговая сумма равна 70 (10*3 + 20*2)
})

const testCases = [
  ['Рассчитывает с 0% скидкой', [{ price: 10, quantity: 5 }], 0, 50],
  ['Рассчитывает с 10% скидкой', [{ price: 10, quantity: 5 }], 10, 45],
  ['Рассчитывает с 50% скидкой', [{ price: 20, quantity: 2 }], 50, 20]
]
test.each(testCases)('Параметризированный тест: %s', (items, discount, expected) => {
  expect(getTotal(items, discount)).toBe(expected) // Проверяем, что итог соответствует ожиданиям
})

test('Выбрасывает ошибку при некорректном значении скидки', () => {
  const items = [{ price: 10, quantity: 1 }]
  // Пример скидки меньше 0
  expect(() => getTotal(items, -10)).toThrow('Процент скидки должен быть от 0 до 99')
  // Пример скидки равной или больше 100
  expect(() => getTotal(items, 100)).toThrow('Процент скидки должен быть от 0 до 99')
  // Пример скидки, не являющейся числом
  expect(() => getTotal(items, 'fifty')).toThrow('Скидка должна быть числом')
})
