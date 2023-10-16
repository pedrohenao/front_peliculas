import { axiosConfiguration } from "../configuration/axiosConfiguration";

// obtener todos los directores
const obtenerDirectores = () => {
  return axiosConfiguration.get("directores/?estado=true", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// crear un genero
const crearDirector = (data) => {
  return axiosConfiguration.post("directores", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// actualizar director
const editarDirector = (tipoId, data) => {
  return axiosConfiguration.put("director/" + tipoId, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// borrar genero
const borrarDirector = (tipoId, data) => {
  return axiosConfiguration.delete(
    "directores/" + tipoId,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

// obtener director por su ID
const obtenerDirectorPorID = (tipoId) => {
  return axiosConfiguration.get("directores/" + tipoId, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export {
  obtenerDirectores,
  crearDirector,
  editarDirector,
  borrarDirector,
  obtenerDirectorPorID,
};
