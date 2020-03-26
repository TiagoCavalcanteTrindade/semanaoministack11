const express = require('express');
const cors = require('cors')
const routes = require('./routes');

const app = express();

app.use(cors(/*{origin: 'http://meuapp.com'}*/));
app.use(express.json()); // para poder utilizar json no body
app.use(routes); // usa as rotas do arquivo routes .js

/*
Métodos HTTP:
GET - buscar informação no back-and;
POST - criar informação no back-and;
PUT - alterar informação no back-and;
DELETE - deletar informação no back-and;
para utilizar estes sem uma interface pronta use o Insominia

Tipos de parâmetros:
Query - parâmetros nomeados enviados na rota depois da "?" e separados por um "&" (filtros, paginação);
Route - parâmetros utilizados para identificar recursos;
Request Body - corpo da requisição, utilizado para criar ou alterar recursos (criar um usuário)

Bancos de dados:
SQL - MySQL, SQLite,PostgreSQLm, Oracle, Microsoft SQL Server;
NoSQL - MongoDB, CouchDB

Métodos de acessar o banco de dados:
Driver - SELECT * FROM users WHERE id = 257
Query Builder - table('users').select('*').where('id = 257')
*/

// porta 3333
app.listen('3333');

// para executar: "node index.js"

// para não ter que reiniciar o node a cada alteração grande: "npm install nodemon -D" o -D para o usuário não carregar o biblioteca D[eveloper] e no package.json crie start dentro da pate de scripts com o valor: "nodemon index.js" e na hora de executar: npm start