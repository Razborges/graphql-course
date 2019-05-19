const db = require('../config/db');

const novoUsuario = {
  nome: 'Pedro',
  email: 'pedro@empresa.com.br',
  senha: '12345678'
};

const exercicio = async () => {
  // count
  const { qtde } = await db('usuarios')
    .count('* as qtde')
    .first();

  // inserir se a tabela estiver vazia
  if (qtde === 0) {
    await db('usuarios').insert(novoUsuario);
  }

  // consultar
  let { id } = await db('usuarios')
    .select('id')
    .first();

  // alterar
  await db('usuarios')
    .where({ id })
    .update({
      nome: 'Pedro Garcia',
      email: 'pedro.garcia@empresa.com.br'
    });

  return db('usuarios').where({ id });
};

exercicio()
  .then(usuario => console.log(usuario))
  .catch(err => console.log(err.sqlMessage))
  .finally(() => db.destroy());
