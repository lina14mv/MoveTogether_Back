const { check, validationResult } = require('express-validator');

const verificarCodigoValidator = [
  check('code').isAlphanumeric().withMessage('El código debe ser alfanumérico'),
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];

module.exports = verificarCodigoValidator;