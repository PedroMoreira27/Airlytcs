const express = require('express');
const router = express.Router();
const statisticsController = require('../controller/statisticsController');

// Rota para calcular as estatísticas
router.post('/calculate-statistics', async (req, res) => {
    try {
        // A função `calculateStatistics` já irá enviar a resposta, então não é necessário fazer isso aqui
        await statisticsController.calculateStatistics(req, res);
    } catch (error) {
        // Aqui você pode enviar um erro caso algo aconteça
        res.status(500).json({ message: "Erro ao calcular estatísticas", error: error.message });
    }
});

// Rota para obter as estatísticas calculadas
router.get('/statistics', statisticsController.getStatistics);

module.exports = router;