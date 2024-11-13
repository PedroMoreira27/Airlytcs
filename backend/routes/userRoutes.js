const express = require('express');
const cors = require('cors');
const router = express.Router();
const userController = require('../controller/userController');

router.use(
  cors({
    origin: '*',
  }),
);

// Rota para registrar um novo usuário
router.post('/register', userController.register);

// Rota para fazer login
router.post('/login', userController.login);

module.exports = router;
