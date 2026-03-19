const express = require('express');
const app = express();

app.use(express.json());

let produtos = [
    { id: 1, nome: "Matrix", nota: 9, categoria: "Ficção Científica" },
    { id: 2, nome: "Titanic", nota: 8, categoria: "Romance" },
    { id: 3, nome: "Batman: O Cavaleiro das Trevas", nota: 10, categoria: "Ação" },
    { id: 4, nome: "Inception", nota: 9, categoria: "Ficção Científica" }
];

let proximoId = 5;

// GET com filtros
app.get('/api/produtos', (req, res) => {
    const { categoria, nota_max, nota_min, ordem, direcao, pagina = 1, limite = 10 } = req.query;

    let resultado = [...produtos];

    // Filtros
    if (categoria) resultado = resultado.filter(p => p.categoria === categoria);
    if (nota_max) resultado = resultado.filter(p => p.nota <= parseFloat(nota_max));
    if (nota_min) resultado = resultado.filter(p => p.nota >= parseFloat(nota_min));

    // Ordenação
    if (ordem) {
        resultado.sort((a, b) => {
            if (ordem === 'nota') {
                return direcao === 'desc' ? b.nota - a.nota : a.nota - b.nota;
            }
            if (ordem === 'nome') {
                return direcao === 'desc'
                    ? b.nome.localeCompare(a.nome)
                    : a.nome.localeCompare(b.nome);
            }
            return 0;
        });
    }

    // Paginação
    const paginaNum = parseInt(pagina);
    const limiteNum = parseInt(limite);
    const inicio = (paginaNum - 1) * limiteNum;

    const paginado = resultado.slice(inicio, inicio + limiteNum);

    res.json({
        dados: paginado,
        paginacao: {
            pagina_atual: paginaNum,
            itens_por_pagina: limiteNum,
            total_itens: resultado.length,
            total_paginas: Math.ceil(resultado.length / limiteNum)
        }
    });
});

// GET por ID
app.get('/api/produtos/:id', (req, res) => {
    const produto = produtos.find(p => p.id === parseInt(req.params.id));

    if (!produto) {
        return res.status(404).json({ erro: "Filme não encontrado" });
    }

    res.json(produto);
});

// POST com validação
app.post('/api/produtos', (req, res) => {
    const { nome, nota, categoria } = req.body;

    if (!nome || nota === undefined || !categoria) {
        return res.status(400).json({ erro: "Campos obrigatórios: nome, nota, categoria" });
    }

    if (typeof nota !== 'number') {
        return res.status(400).json({ erro: "Nota deve ser um número" });
    }

    if (nota < 0 || nota > 10) {
        return res.status(400).json({ erro: "Nota deve estar entre 0 e 10" });
    }

    if (nome.length < 2) {
        return res.status(400).json({ erro: "Nome muito curto" });
    }

    const novoProduto = {
        id: proximoId++,
        nome,
        nota,
        categoria
    };

    produtos.push(novoProduto);

    res.status(201).json(novoProduto);
});

app.listen(3000, () => {
    console.log('API de filmes rodando na porta 3000');
});