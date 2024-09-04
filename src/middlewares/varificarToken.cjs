const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Acceso denegado" });

  // Verifica la existencia de JWT_SECRET
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET no está definido en el entorno");
  }

  // Verifica la estructura básica del token
  if (token.split(".").length !== 3) {
    return res.status(400).json({ error: "Token inválido" });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token no válido" });
  }
};

module.exports = verificarToken;
