const express = require('express');
const mongoose = require('mongoose');
const bookRoutes = require('./routes/bookRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conexão ao MongoDB
mongoose.connect('mongodb+srv://dba:papito123@livroapi.2eqks.mongodb.net/?retryWrites=true&w=majority&appName=LivroApi')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(express.json());

// Rotas
app.use('/api', bookRoutes);

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
