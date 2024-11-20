const express = require('express');
const router = express.Router();
const likePost = require('../../controladores/Posts/like'); 
const verificarToken = require('../../middlewares/varificarToken.cjs');
const { validationResult } = require('express-validator'); 

router.post('/:postId/like', verificarToken, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  likePost(req, res);
});

module.exports = router;