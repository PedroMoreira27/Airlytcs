require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const readingsRouter = require('./routes/routes'); 
const userRoutes = require('./routes/userRoutes');
const statisticsRoutes = require('./routes/statisticsRoutes');

const app = express();
const mongoDB = process.env.MONGODB_URI;
const porto = process.env.PORT || 5000;

// Conexão com o MongoDB
mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB conectado com sucesso!`))
  .catch((err) => {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    process.exit(1);
  });

app.use(express.json()); // Substituindo body-parser
app.use('/readings', readingsRouter);
app.use('/users', userRoutes);
app.use('/statistics', statisticsRoutes);

const swaggerDocument = YAML.load('./openapi.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { customCss: '.swagger-ui .topbar { display: none }' }));

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Ocorreu um erro no servidor!' });
});

// Inicializa o servidor
app.listen(porto, () => {
  console.log(`Servidor em execução no porto: ${porto}`);
});
