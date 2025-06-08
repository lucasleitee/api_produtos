import Usuario from '../models/usuario.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 🔐 Chave secreta para geração do token JWT
const SECRET = 'seu_segredo_super_secreto'; // Troque por uma variável de ambiente em produção

// ✅ Cadastro de usuário
export const cadastrarUsuario = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    // Verificar se já existe um usuário com este email
    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografar a senha
    const hashSenha = await bcrypt.hash(senha, 10);

    const usuario = await Usuario.create({
      nome,
      email,
      senha: hashSenha
    });

    res.status(201).json({ message: 'Usuário cadastrado com sucesso', usuario });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔑 Login do usuário
export const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.status(401).json({ error: 'Senha inválida' });
    }

    // Gerar token JWT
    const token = jwt.sign({ id: usuario.id, email: usuario.email }, SECRET, {
      expiresIn: '1d'
    });

    res.status(200).json({ message: 'Login bem-sucedido', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 🔄 Recuperação de senha (simples, apenas exemplo)
export const recuperarSenha = async (req, res) => {
  const { email, novaSenha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const hashSenha = await bcrypt.hash(novaSenha, 10);

    await Usuario.update({ senha: hashSenha }, { where: { email } });

    res.status(200).json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
