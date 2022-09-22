import './styles/index.scss'

const userStack = {
  language: 'JS',
  framework: 'Angular'
}

const user = {
  name: 'Vitalij',
  age: '37',
  ...userStack
}

console.log(user);