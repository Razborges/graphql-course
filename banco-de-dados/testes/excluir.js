const db = require('../config/db');

const novoUsuario = {
  nome: 'Pedro',
  email: 'pedro@empresa.com.br',
  senha: '12345678'
};

// excluir pelo id
db('usuarios')
  .where({ id: 1 })
  .delete()
  .then(res => console.log(res))
  .catch(err => console.log(err.sqlMessage))
  .finally(() => db.destroy());

// excluir tudo
// db('usuarios')
//   .delete()
//   .then(res => console.log(res))
//   .catch(err => console.log(err.sqlMessage))
//   .finally(() => db.destroy());
