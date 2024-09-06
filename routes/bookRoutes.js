const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Cadastro de livro
router.post('/books', async (req, res) => {
    try {
        const { title, author, publisher, year, pages } = req.body;

        // Verificação se todos os campos foram preenchidos
        if (!title || !author || !publisher || !year || !pages) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        }

        const duplicado = await Book.findOne({title: title})

        if (duplicado) {
            return res.status(409).json({erro: 'O título do livro já foi cadastrado.'})
        }


        const book = new Book({ title, author, publisher, year, pages  });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao cadastrar livro' });
    }
});
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Consulta de livro por ID
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Livro não encontrado.' });
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Remoção de livro
router.delete('/books/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        
        // Verifica se o livro existe
        if (!book) {
            return res.status(404).json({ message: 'Livro não encontrado.' });
        }
        
        // Se o livro foi encontrado e deletado
        res.json({ message: 'Livro excluído com sucesso.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



module.exports = router;
