const express = require('express');
const cors = require('cors');
const router = express.Router();
const readingController = require('../controller/controller');

router.use(
  cors({
    origin: '*',
  }),
);

// Rota para criar uma nova leitura
router.post('/', readingController.createReading);

// Rota para obter todas as leituras
router.get('/', readingController.getAllReadings);

// Rota para obter uma leitura específica por ID
router.get('/:id', readingController.getReadingById);

// Rota para atualizar uma leitura
router.put('/:id', readingController.updateReading);

// Rota para deletar uma leitura
router.delete('/:id', readingController.deleteReading);

module.exports = router;
