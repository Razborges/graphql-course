const db = require('../../config/db');
const { perfil: obterPerfil } = require('../Query/perfil');

module.exports = {
  novoPerfil: async (_, { dados }) => {
    try {
      const [id] = await db('perfis').insert(dados);
      return db('perfis')
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },

  excluirPerfil: async (_, args) => {
    try {
      const perfil = await obterPerfil(_, args);
      if (perfil) {
        const { id } = perfil;
        await db('usuarios_perfis')
          .where({ perfil_id: id })
          .delete();
        await db('perfis')
          .where({ id })
          .delete();
      }
      return perfil;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },

  alterarPerfil: async (_, { filtro, dados }) => {
    try {
      const perfil = await obterPerfil(_, { filtro });
      if (perfil) {
        const { id } = perfil;
        await db('perfis')
          .where({ id })
          .update(dados);
      }
      return { ...perfil, ...dados };
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  }
};
