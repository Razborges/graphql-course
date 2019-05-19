const db = require('../config/db')

// db('perfis')
//   // .then(res => console.log(res))
//   .map(p => p.nome)
//   .then(nomes => console.log(nomes))
//   .catch(err => console.log(err.sqlMessage))
//   .finally(() => db.destroy())

// db('perfis').select('nome', 'id')
//   .then(res => console.log(res))
//   .finally(() => db.destroy())

// db('perfis').select('nome', 'id')
//   .limit(2).offset(0)
//   .then(res => console.log(res))
//   .finally(() => db.destroy())
  
db('perfis')
  .where({ id: 2 })
  // .where('nome', 'like', '%min%') // buscar pela string em qualquer parte da palavra
  .first() // retorna o objeto sem retorna um array
  .then(res => console.log(res))
  .finally(() => db.destroy())