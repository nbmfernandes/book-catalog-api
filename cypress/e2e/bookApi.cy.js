// //cypress/integration/bookApi.spec.js

describe('Book API Tests', () => {
  const apiUrl = 'http://localhost:5000/api/books';
  
  const novoLivro = {
    title: 'The Pragmatic Programmer',
    author: 'Andrew Hunt, David Thomas',
    publisher: 'Addison-Wesley',
    year: 1999,
    pages: 352
  };

  const unicoLivro = {
    title: 'Harry Potter e a Pedra Filosofal',
    author: 'J.K. Rowling',
    publisher: 'Rocco',
    year: 1997,
    pages: 223
  };

  // Função auxiliar para criar um livro
  const criarLivro = (book) => {
    return cy.api('POST', apiUrl, book).then((response) => {
      expect(response.status).to.eql(201);
      expect(response.body).to.include(book);
      expect(response.body._id).to.not.be.empty;
      return response.body._id; // Retorna o ID do livro criado
    });
  };

  // Limpar a coleção antes de começar os testes
  before(() => {
    cy.dropCollection('books', { database: 'test', failSilently: 'true' }).then(result => {
      cy.log(result);
    });
  });

  // Teste de cadastro de livro
  it('Cadastrar livro', () => {
    criarLivro(novoLivro);
  });

  // Teste de unicidade ao cadastrar
  it('Validar unicidade do livro', () => {
    criarLivro(unicoLivro); // Cria o livro

    // Tenta criar novamente o mesmo livro para testar unicidade
    cy.api({
      method: 'POST',
      url: apiUrl,
      body: unicoLivro,
      failOnStatusCode: false 
    }).then((response) => {
      expect(response.status).to.eq(409);
      expect(response.body.erro).to.eql('O título do livro já foi cadastrado.');
    });
  });

  // Teste de listagem de livros
  it('Listar livros cadastrados', () => {
    cy.api('GET', apiUrl).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.be.greaterThan(0);
    });
  });

  // Teste de consulta de livro por ID
  it('Listar um livro através do ID', () => {
    criarLivro({
      title: 'Clean Code',
      author: 'Robert C. Martin',
      publisher: 'Prentice Hall',
      year: 2008,
      pages: 464
    }).then((bookId) => {
      cy.api('GET', `${apiUrl}/${bookId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.include({
          title: 'Clean Code',
          author: 'Robert C. Martin',
          publisher: 'Prentice Hall',
          year: 2008,
          pages: 464
        });
      });
    });
  });

  // Teste de remoção de livro
  it('Deletar livro', () => {
    criarLivro({
      title: 'Refactoring',
      author: 'Martin Fowler',
      publisher: 'Addison-Wesley',
      year: 1999,
      pages: 456

    }).then((bookId) => {
      cy.api('DELETE', `${apiUrl}/${bookId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('message', 'Livro excluído com sucesso.');

      });

      // Verifica se o livro foi realmente deletado
      cy.api({
        url: `${apiUrl}/${bookId}`,
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('message', 'Livro não encontrado.');
      });
    });
  });

  // Teste de validação de campos obrigatórios
  it('Validar campos obrigatórios no cadastro', () => {
    cy.api({
      method: 'POST',
      url: apiUrl,
      body: {},
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eql('Todos os campos são obrigatórios');
    });
  });
});
