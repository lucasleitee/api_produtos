import express from 'express';
import {
  criarProduto,
  listarProdutos,
  listarProdutoPorId,
  atualizarProduto,
  deletarProduto
} from '../controllers/produtoController.js';

const router = express.Router();

router.post('/produtos', criarProduto);
router.get('/produtos', listarProdutos);
router.get('/produtos/:id', listarProdutoPorId);
router.put('/produtos/:id', atualizarProduto);
router.patch('/produtos/:id', atualizarProduto);
router.delete('/produtos/:id', deletarProduto);

export default router;
