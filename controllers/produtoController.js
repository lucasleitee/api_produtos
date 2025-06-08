import Produto from '../models/produto.js';

export const criarProduto = async (req, res) => {
  try {
    const { nome, categoria, dataEntrada, dataValidade, quantidade, preco } = req.body;

    const precoFormatado = typeof preco === 'string' ? parseFloat(preco.replace(',', '.')) : preco;

    const produto = await Produto.create({
      nome,
      categoria,
      dataEntrada,
      dataValidade,
      quantidade,
      preco: precoFormatado
    });

    res.status(201).json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listarProdutoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
    res.json(produto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const atualizarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const [atualizado] = await Produto.update(req.body, { where: { id } });
    if (atualizado) {
      const produtoAtualizado = await Produto.findByPk(id);
      res.json(produtoAtualizado);
    } else {
      res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletarProduto = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await Produto.destroy({ where: { id } });
    if (deletado) {
      res.json({ mensagem: 'Produto deletado com sucesso' });
    } else {
      res.status(404).json({ mensagem: 'Produto não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
