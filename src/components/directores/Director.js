import React, { useEffect, useState } from "react";
import {
  borrarDirector,
  crearDirector,
  obtenerDirectores,
} from "../../services/DirectorService";
import Title from "../ui/Title";
import Modal from "./Modal";
import Table from "./Table";
import ButtonModal from "../ui/ButtonModal";
import Spinner from "../ui/Spinner";
import Swal from "sweetalert2";

export default function Director() {
  const [directores, setGeneros] = useState([]);
  const [loader, setLoader] = useState(false);
  const [director, setDirector] = useState({
    nombre: "",
  });

  useEffect(() => {
    listarDirectores();
  }, []);

  const listarDirectores = async () => {
    setLoader(true);
    try {
      const { data } = await obtenerDirectores();
      setGeneros(data);
      setLoader(false);
    } catch (e) {
      console.log(e);
      setLoader(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al cargar datos!",
        footer: "Intenta de nuevo!",
      });
    }
  };

  const guardar = async () => {
    setLoader(true);
    try {
      const response = await crearDirector(director);
      console.log(response);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Guardado exitoso",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoader(false);
      clearForm();
      listarDirectores();
    } catch (e) {
      console.log(e);
      setLoader(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al intentar guardar!",
        footer: "Intenta de nuevo!",
      });
    }
  };

  const handleChange = (e) => {
    console.log(e.target);
    setDirector({
      ...director,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setDirector({
      nombre: "",
    });
  };

  const borrarDirectorPorId = (e) => {
    const id = e.target.id;
    setLoader(true);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await borrarDirector(id);
            console.log(response);
            setLoader(false);
            listarDirectores();
          } catch (e) {
            console.log(e);
            setLoader(false);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al intentar eliminar!",
              footer: "Intenta de nuevo!",
            });
          }
          swalWithBootstrapButtons.fire(
            "Borrado!",
            "Genero borrado.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Cancelled",
            "Cancelaste la borrada :)",
            "error"
          );
          setLoader(false);
        }
      });
  };

  return (
    <>
      <Title title={"Directores"} />
      {loader && <Spinner />}
      <Table directores={directores} borrarGeneroPorId={borrarDirectorPorId} />
      <ButtonModal title="Nuevo Director" />
      <Modal
        director={director}
        change={handleChange}
        guardar={guardar}
        clearForm={clearForm}
      />
    </>
  );
}
