// @ts-expect-error TS(2451): Cannot redeclare block-scoped variable 'teacher'.
const teacher = {
  id: 1,
  name: 'Damir Rysaev',
  isActive: true,
  roles: ['teacher', 'mentor'],
  social: {
    x: 'https://twitter.com/user',
    vk: 'https://vk.com/user'
  }
}

console.log(teacher)
