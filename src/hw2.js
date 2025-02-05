function newYear(character) {
  let result
  switch (character) {
    case 'Дед Мороз':
      result = `${character}! ${character}! ${character}!`
      break
    case 'Снегурочка':
      result = `${character}! ${character}! ${character}!`
      break
  }
  return result
}

console.log(newYear('Дед Мороз'))
console.log(newYear('Снегурочка'))
