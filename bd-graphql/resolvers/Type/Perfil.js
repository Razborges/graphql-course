const db = require('../../config/db');

module.exports = {
  usuarios: perfil => {
    return db('perfis')
      .join('usuarios_perfis', 'usuarios.id', 'usuarios_perfis.usuario_id')
      .where({ usuario_id: perfil.id });
  }
};
