const express = require('express');
const router = express.Router();
const logoutController = require('../../controladores/Registro/logout');
const { validationResult } = require('express-validator');
const verificarToken = require('../../middlewares/varificarToken.js');

router.post('/logout', verificarToken, (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    logoutController(req, res);
});

module.exports = router;