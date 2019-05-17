const { usuarios, perfis } = require('../data/db')

module.exports = {
  ola() {
    return 'Basta retornar uma consulta.'
  },
  horaAtual() {
    return new Date
  },
  usuarioLogado() {
    return {
      id: 1,
      nome: 'Ana da Web',
      email: 'anadaweb@email.com',
      idade: 23,
      salario_real: 1234.56,
      vip: true
    }
  },
  produtoEmDestaque() {
    return {
      nome: 'Notebook Gamer',
      preco: 4890.89,
      desconto: 0.15
    }
  },
  numeroMegaSena() {
    // return [4, 8, 13, 27, 33, 54]
    const crescente = (a, b) => a - b
    return Array(6).fill(0)
      .map(n => parseInt(Math.random() * 60 + 1))
      .sort(crescente)
  },
  usuarios() {
    return usuarios
  },
  // usuario(_, args) {
  usuario(_, args) {
    const selecionado = usuarios.filter(u => u.id == args.id)
    return selecionado ? selecionado[0] : null
  },
  perfis: () => perfis,
  perfil: (_, { id }) => {
    const perf = perfis.filter(p => p.id === id)
    return perf ? perf[0] : null
  }
}
