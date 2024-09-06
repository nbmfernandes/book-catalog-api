# 📚 Book Catalog API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=for-the-badge&logo=cypress&logoColor=white)

API RESTful desenvolvida com Node.js, Express, MongoDB e Cypress para gerenciar um sistema de cadastro de livros. A API permite adicionar, listar, consultar, atualizar e excluir livros de um banco de dados MongoDB.

## 📋 Funcionalidades

- **Cadastrar livros**: Adicione livros com título, autor, editora, ano de publicação e número de páginas.
- **Listar livros**: Consulte todos os livros cadastrados.
- **Buscar por ID**: Encontre um livro específico usando seu ID.
- **Atualizar livro**: Atualize os detalhes de um livro já cadastrado.
- **Excluir livro**: Delete livros usando seu ID.

## 🚀 Tecnologias Utilizadas

- **Node.js**: Plataforma de desenvolvimento JavaScript no lado do servidor.
- **Express**: Framework minimalista para gerenciar as rotas da API.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os livros.
- **Mongoose**: ODM (Object Data Modeling) para facilitar a interação com o MongoDB.
- **Cypress**: Ferramenta de testes end-to-end utilizada para validar a API.

## 🔧 Instalação e Configuração

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado.
- [MongoDB](https://www.mongodb.com/) em execução (local ou em um serviço cloud como o MongoDB Atlas).

### Passos para rodar o projeto

1. Clone o repositório:

    ```bash
    git clone https://github.com/seu-usuario/book-catalog-api.git
    cd book-catalog-api
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Crie um arquivo `.env` na raiz do projeto com a URI de conexão do MongoDB:

    ```env
    MONGODB_URI=mongodb://localhost:27017/book-catalog
    ```

4. Inicie o servidor:

    ```bash
    npm start
    ```

    A API estará disponível em `http://localhost:5000`.

### Executando os Testes

1. Para rodar os testes de integração e e2e com Cypress, use:

    ```bash
    npm run cypress:open
    ```

2. Para rodar os testes em modo headless (sem abrir o navegador), execute:

    ```bash
    npm run cypress:run
    ```

## 📚 Endpoints da API

| Método | Endpoint              | Descrição                          |
|--------|-----------------------|------------------------------------|
| `POST` | `/api/books`           | Cadastrar um novo livro            |
| `GET`  | `/api/books`           | Listar todos os livros cadastrados |
| `GET`  | `/api/books/:id`       | Consultar livro por ID             |
| `PUT`  | `/api/books/:id`       | Atualizar informações de um livro  |
| `DELETE`| `/api/books/:id`      | Deletar um livro                   |

### Exemplo de requisição para criar um livro

```json
  POST /api/books
  {
    "title": "The Pragmatic Programmer",
    "author": "Andrew Hunt, David Thomas",
    "publisher": "Addison-Wesley",
    "year": 1999,
    "pages": 352
  }
```

### 🧪 Testes com Cypress
A suíte de testes cobre os principais cenários de uso da API. Alguns testes incluem:

Cadastrar livro: Testa o cadastro de um novo livro.
Validar unicidade: Verifica se o título do livro é único.
Deletar livro: Testa a exclusão de um livro e a confirmação da sua remoção.



