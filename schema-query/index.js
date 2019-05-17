const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  # não tem date como tipo primitivo escalar, aqui cria o tipo
  scalar Date

  type Usuario {
    id: ID
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  # Pontos de entrada da sua API!
  type Query {
    ola: String!
    horaAtual: Date!
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
    numeroMegaSena: [Int!]!
  }
`

const resolvers = {
  Usuario: {
    salario(usuario) {
      return usuario.salario_real
    }
  },
  
  Produto: {
    precoComDesconto(produto) {
      return produto.desconto ? produto.preco * (1 - produto.desconto) : produto.preco
    }
  },

  Query: {
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`executando em ${url}`)
})
