import express from 'express';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Usuario from '../models/usuario.js';

const router = express.Router();

// 🔸 Cadastro
router.post('/cadastrar', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const hash = await bcrypt.hash(senha, 10);
        const usuario = await Usuario.create({ nome, email, senha: hash });
        res.status(201).json({ message: 'Usuário cadastrado com sucesso!', usuario });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar usuário', detalhes: error.message });
    }
});

// 🔸 Login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        res.json({
            message: 'Login realizado com sucesso',
            usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro no login', detalhes: error.message });
    }
});

// 🔸 Esqueceu senha
router.post('/esqueceu-senha', async (req, res) => {
    const { email } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const token = uuidv4();
        const validade = new Date(Date.now() + 3600000); // 1 hora

        usuario.token_recuperacao = token;
        usuario.token_expira_em = validade;
        await usuario.save();

        const link = `http://localhost:3000/resetar-senha?token=${token}`;
        console.log(`Link de recuperação: ${link}`);

        res.json({
            message: 'Token de recuperação gerado. Verifique seu e-mail (simulado no console).'
        });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar token', detalhes: error.message });
    }
});

// 🔸 Resetar senha
router.post('/resetar-senha', async (req, res) => {
    const { token, novaSenha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { token_recuperacao: token } });

        if (!usuario) {
            return res.status(404).json({ error: 'Token inválido' });
        }

        if (usuario.token_expira_em < new Date()) {
            return res.status(400).json({ error: 'Token expirado' });
        }

        const hash = await bcrypt.hash(novaSenha, 10);

        usuario.senha = hash;
        usuario.token_recuperacao = null;
        usuario.token_expira_em = null;
        await usuario.save();

        res.json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao redefinir senha', detalhes: error.message });
    }
});

export default router;
