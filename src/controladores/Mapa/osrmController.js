const { getRouteFromOSRM } = require("./osrmService");

/**
 * Verifica que una coordenada sea válida
 * @param {Array} coord Coordenada [lon, lat]
 * @returns {boolean} True si es válida, false en caso contrario
 */
const isValidCoordinate = (coord) => {
  if (!Array.isArray(coord) || coord.length !== 2) {
    return false;
  }
  const [lon, lat] = coord;
  return (
    !isNaN(lon) && // Verifica que no sea NaN
    !isNaN(lat) && // Verifica que no sea NaN
    typeof lon === "number" &&
    typeof lat === "number" &&
    lon >= -180 &&
    lon <= 180 &&
    lat >= -90 &&
    lat <= 90
  );
};

/**
 * Valida las entradas del usuario
 * @param {Array} origin Coordenadas de origen
 * @param {Array} destination Coordenadas de destino
 * @param {Array} waypoints Coordenadas intermedias
 * @returns {Object|null} Mensaje de error o null si es válido
 */
const validateInputs = (origin, destination, waypoints) => {
  if (!origin || !destination) {
    return { error: "Origin and destination are required" };
  }
  if (!isValidCoordinate(origin)) {
    return { error: "Invalid origin coordinates" };
  }
  if (!isValidCoordinate(destination)) {
    return { error: "Invalid destination coordinates" };
  }
  if (!Array.isArray(waypoints)) {
    return { error: "Waypoints must be an array" };
  }
  for (const waypoint of waypoints) {
    if (!isValidCoordinate(waypoint)) {
      return {
        error: `Invalid waypoint coordinates: ${JSON.stringify(waypoint)}`,
      };
    }
  }
  return null;
};

/**
 * Controlador para obtener la ruta entre un origen y un destino
 * @param {Object} req La solicitud (con origen, destino, waypoints)
 * @param {Object} res La respuesta (que devolverá los datos de la ruta)
 */
const getRoute = async (req, res) => {
  try {
    const { origin, destination, waypoints = [] } = req.body;

    // Validar las entradas
    const validationError = validateInputs(origin, destination, waypoints);
    if (validationError) {
      return res.status(400).json(validationError);
    }

    // Llamar a la función para obtener la ruta
    const route = await getRouteFromOSRM(origin, destination, waypoints);
    res.json(route);
  } catch (error) {
    // Manejar cualquier error inesperado
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRoute };
