const { body } = require('express-validator');

const validacionesCodigoCambiar = [
  body('email')
    .notEmpty()
    .withMessage('El email es obligatorio.')
    .isEmail()
    .withMessage('Debe proporcionar un email válido.'),
  body('codigo')
    .notEmpty()
    .withMessage('El código es obligatorio.')
    .isLength({ min: 6, max: 6 })
    .withMessage('El código debe tener 6 caracteres.'),
  body('nuevaContrasenia')
    .notEmpty()
    .withMessage('La nueva contraseña es obligatoria.')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*+?&])[A-Za-z\d@$!%*+?&]{8,}$/
    )
    .withMessage("La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"),
];

module.exports = validacionesCodigoCambiar;
