⚖️ Tecnologias Utilizadas

Backend: Node.js, Express.js, Sequelize ORM

Banco de Dados: PostgreSQL

Frontend: HTML5, CSS3, JavaScript Puro

Autenticação: Login com Google (OAuth 2.0) e e-mail/senha criptografados com bcrypt

Hospedagem Local: localhost:3000 para API e localhost:5500 para front-end

✅ Funcionalidades Principais

Cadastro de produtos com os seguintes campos:

Nome

Categoria (Fruta, Legume, Verdura)

Quantidade

Preço

Data de Entrada

Data de Validade

Edição parcial (um campo) ou total (todos os campos)

Exclusão de produtos

Consulta de produto por ID

Listagem de todos os produtos

Cadastro e login de usuário

Recuperação de senha com token

Interface responsiva para dispositivos móveis


⚙ Configurações Necessárias para Testar o Projeto

1. Banco de Dados PostgreSQL

Criar o banco de dados:

CREATE DATABASE api_produtos;

Criar a tabela usuarios:

CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  token_recuperacao VARCHAR(255),
  token_expira_em TIMESTAMP
);

Criar a tabela produtos:

CREATE TABLE produtos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  categoria VARCHAR(100) NOT NULL,
  dataEntrada DATE NOT NULL,
  dataValidade DATE NOT NULL,
  quantidade INTEGER NOT NULL,
  preco DECIMAL(10,2) NOT NULL
);

Arquivo .env com configurações de banco

DB_NAME=api_produtos
DB_USER=postgres
DB_PASSWORD=sua_senha_aqui
DB_HOST=localhost
DB_PORT=5432

Inicialização da API local
npm install
npm run dev


Executar o frontend

http://localhost:5500/index.html


