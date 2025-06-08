import express from 'express';
import produtoRoutes from './routes/produtoRoutes.js';
import sequelize from './config/database.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// PERMITIR REQUISIÇÕES EXTERNAS
app.use(cors());
// Middleware para aceitar JSON
app.use(express.json());

// Rotas  
app.use('/usuarios', usuarioRoutes);
app.use(produtoRoutes);

// Teste da conexão com o banco
sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados com sucesso!');
  })
  .catch(err => {
    console.error('Erro ao conectar no banco de dados:', err);
  });

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
