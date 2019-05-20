const db = require('../../config/db');
const { perfil: obterPerfil } = require('../Query/perfil');
const { usuario: obterUsuario } = require('../Query/usuario');

module.exports = {
  novoUsuario: async (_, { dados }) => {
    try {
      const idsPerfis = [];

      if (dados.perfis) {
        for (let filtro of dados.perfis) {
          const perfil = await obterPerfil(_, { filtro });
          if (perfil) idsPerfis.push(perfil.id);
        }
      }

      delete dados.perfis;

      const [id] = await db('usuarios').insert(dados);

      for (let perfilId of idsPerfis) {
        await db('usuarios_perfis').insert({
          perfil_id: perfilId,
          usuario_id: id
        });
      }

      return db('usuarios')
        .where({ id })
        .first();
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },

  excluirUsuario: async (_, args) => {
    try {
      const usuario = await obterUsuario(_, args);

      if (usuario) {
        const { id } = usuario;
        await db('usuarios_perfis')
          .where({ usuario_id: id })
          .delete();
        await db('usuarios')
          .where({ id })
          .delete();
      }

      return usuario;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  },

  alterarUsuario: async (_, { filtro, dados }) => {
    try {
      const usuario = await obterUsuario(_, { filtro });

      if (usuario) {
        const { id } = usuario;
        if (dados.perfis) {
          await db('usuarios_perfis')
            .where({ usuario_id: id })
            .delete();

          for (let filtro of dados.perfis) {
            const perfil = await obterPerfil(_, { filtro });
            perfil &&
              (await db('usuarios_perfis').insert({
                perfil_id: perfil.id,
                usuario_id: id
              }));
          }
        }

        delete dados.perfis;
        await db('usuarios')
          .where({ id })
          .update(dados);

        return { ...usuario, ...dados };
      }

      return null;
    } catch (e) {
      throw new Error(e.sqlMessage);
    }
  }
};
