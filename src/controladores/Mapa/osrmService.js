// services/osrmService.js
const axios = require("axios");

/**
 * Función para obtener una ruta desde OSRM
 * @param {Array} origin Coordenadas de origen [lon, lat]
 * @param {Array} destination Coordenadas de destino [lon, lat]
 * @param {Array} waypoints Coordenadas intermedias [[lon, lat], [lon, lat], ...]
 * @returns {Object} Datos de la ruta (distancia, duración, polilínea)
 */
const getRouteFromOSRM = async (origin, destination, waypoints = []) => {
  try {
    const coordinates = [
      `${origin[0]},${origin[1]}`, // Origen
      ...waypoints.map((wp) => `${wp[0]},${wp[1]}`), // Waypoints
      `${destination[0]},${destination[1]}`, // Destino
    ].join(";");

    // URL del servicio público de OSRM
    const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}`;

    // Realizar la solicitud
    const response = await axios.get(url, {
      params: {
        overview: "full", // Incluir toda la geometría de la ruta
        geometries: "geojson", // Formato GeoJSON para la geometría
        steps: true, // Incluir pasos detallados (opcional)
      },
    });

    // Extraer la primera ruta del resultado
    const route = response.data.routes[0];
    return {
      distance: route.distance, // Distancia total en metros
      duration: route.duration, // Duración total en segundos
      geometry: route.geometry, // Geometría de la ruta (GeoJSON)
      legs: route.legs, // Detalles por segmentos (origen -> waypoints -> destino)
    };
  } catch (error) {
    console.error("Error al obtener la ruta:", error.message);
    throw new Error("No se pudo calcular la ruta.");
  }
};

module.exports = { getRouteFromOSRM };
