const express = require("express");
const router = express.Router();

// Importar rutas
const crearUsuario = require("./Registro/crearUsuarioRuta.js");
const login = require("./Registro/loginRuta.js");
const verificarCodigo = require("./Registro/verificarCodigoRuta.js");
const cambiarContrasenia = require("./Registro/cambiarContraseniaRuta.js");
const logout = require("./Registro/logoutRuta.js");
const proteccion = require("./Registro/protecRutas");

//Rutas de Usuarios
const buscarPorNombre = require("./Usuarios/buscarPorNombreRuta.js");
const buscarPerfil = require("./Usuarios/buscarPerfilRuta.js");
const actualizarPerfil = require("./Usuarios/actualizarPerfilRuta.js");
const fotoPerfil = require("./Usuarios/fotoPerfilRuta.js");

//posts
const crearPublicacion = require("./Posts/crearPublicacionRuta.js");
const PublicacionesUsuarios = require("./Posts/publicacionesUsuarioRuta.js");
const feed = require("./Posts/feedRuta.js");
const eliminarPost = require("./Posts/eliminarPostRuta.js");
const actualizarPost = require("./Posts/actualizarPostRuta.js");
const likePost = require("./Posts/likeRuta.js");

//Mensajes
const chat = require("./Chat/chatRuta.js");
const conversacion = require("./Chat/conversacionRuta.js");
const ultimoMensaje = require("./Chat/ultimoMensajeRuta.js");


//Amigos
const agregarAmigo = require("./Amigos/agregarAmigoRuta.js");
const eliminarAmigo = require("./Amigos/eliminarAmigoRuta.js");
const listarAmigos = require("./Amigos/listarAmigosRuta.js");
const perfilAmigos = require("./Amigos/perfilAmigoRuta.js");

//Imagenes
const uploadRuta = require("./Imagenes/uploadRuta.js");

//comunidades
const crearComunidad = require("./Comunidades/crearComunidadRuta.js");
const unirseComunidad = require("./Comunidades/unirseComunidadRuta.js");
const listarComunidades = require("./Comunidades/obtenerComunidadesRuta.js");
const actualizarComunidad = require("./Comunidades/actualizarComunidadRuta.js");
const verComunidad = require("./Comunidades/verComunidadRuta.js");
const filtrarComunidades = require("./Comunidades/filtrarComunidadesRuta.js");
// Mapas
const osrmRuta = require("./Mapa/osrmRuta.js");

//Eventos
const crearEvento = require("./Eventos/crearEventoRuta.js");
const verEventosUser = require("./Eventos/verEventosUsuarioRuta.js");
const elimiarEvento = require("./Eventos/eliminarEventoRuta.js");
const feedEvento = require("./Eventos/feedEventoRuta.js");

router.use("/api", crearUsuario);
router.use("/api", verificarCodigo);
router.use("/api", login);
router.use("/api", logout);
router.use("/api", proteccion);
router.use("/api", cambiarContrasenia);
router.use("/api", buscarPorNombre);
router.use("/api", buscarPerfil);
router.use("/api", actualizarPerfil);
router.use("/api", fotoPerfil);
router.use("/api", agregarAmigo);
router.use("/api", eliminarAmigo);
router.use("/api", listarAmigos);
router.use("/api", crearPublicacion);
router.use("/api", PublicacionesUsuarios);
router.use("/api", likePost);
router.use("/api", feed);
router.use("/api", eliminarPost);
router.use("/api", actualizarPost);
router.use("/api", uploadRuta);
router.use("/api", chat);
router.use("/api", conversacion);
router.use("/api", ultimoMensaje);
router.use("/api", crearComunidad);
router.use("/api", unirseComunidad);
router.use("/api", osrmRuta);
router.use("/api", listarComunidades);
router.use("/api", actualizarComunidad);
router.use("/api", crearEvento);
router.use("/api", verComunidad);
router.use("/api", verEventosUser);
router.use("/api", elimiarEvento);
router.use("/api", feedEvento);
router.use("/api", filtrarComunidades);
router.use("/api", perfilAmigos);

module.exports = router;
