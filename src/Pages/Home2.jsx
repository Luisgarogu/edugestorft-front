import "../Pages/css/home2.css";
import React, { useEffect, useState } from "react";
import Service from "../Services/Services";
import "aos/dist/aos.css";
import AOS from "aos";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faBook,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip, Modal } from "react-bootstrap";

function Home2() {
  const services = new Service();

  //DATOS GET
  const [dataUsers, setDataUsers] = useState([]);
  const [dataRoles, setDataRoles] = useState([]);
  const [dataPaises, setDataPais] = useState([]);
  const [dataCursos, setDataCursos] = useState([]);
  const [dataMatriculasByUsuario, setDataMatriculasByUsuario] = useState([]);

  //VISTAS MODELOS
  const [showUsuario, setShowUsuario] = useState(false);
  const [showUsuarioPE, setShowUsuarioPE] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showCrear1, setShowCrear1] = useState(false);
  const [showMatriculas, setShowMatriculas] = useState(false);
  const [showCrearCursos, setShowCrearCursos] = useState(false);
  const [showEditCurso, setShowEditCurso] = useState(false);

  //FILTRO TABLA
  const [filtro, setFiltro] = useState("estdts");

  //PUT - POST - CAMPOS DE DATOS
  const [usuarioEdit, setUsuarioEdit] = useState(""),
    [usuarioContraseñaEdit, setUsuarioContraseñaEdit] = useState("");
  const [usarioCorreoEdit, setUsarioCorreoEdit] = useState(""),
    [usuarioRolEdit, setUsuarioRolEdit] = useState("");
  const [usuarioDniEdit, setUsuarioDniEdit] = useState(""),
    [usuarioNombreEdit, setUsuarioNombreEdit] = useState("");
  const [usuarioApellidoEdit, setUsuarioApellidoEdit] = useState(""),
    [usuarioTelefonoEdit, setUsuarioTelefonoEdit] = useState("");
  const [usuarioDireccionEdit, setUsuarioDireccionEdit] = useState(""),
    [usuarioFNEdit, setUsuarioFNEdit] = useState("");
  const [usuarioPaisEdit, setUsuarioPaisEdit] = useState("");
  const [objectUserEdit, setObjectUserEdit] = useState("");
  const [cursoAñadir, setCursoAñadir] = useState("");
  const [changePaisEdit, setChangePaisEdit] = useState(false);
  const [changeRolEdit, setChangeRolEdit] = useState(false);

  // DROPDOWNS - SELECTS
  const [usuarioPaisEditSelect, setUsuarioPaisEditSelect] = useState([]);
  const [usuarioRolEditSelect, setUsuarioRolEditSelect] = useState([]);
  const [cursoEditSelect, setCursoEditSelect] = useState([]);
  const [cursoSelect, setCursoSelect] = useState([]);
  const [idCursoTableSelect, setIdCursoTableSelect] = useState([]);

  //INICIO DE PAGINA

  useEffect(() => {
    async function fetchData() {
      await services.getUsers().then((data) => {
        setDataUsers(data);
      });
      await services.getRoles().then((data) => {
        setDataRoles(data);
      });
      await services.getPaises().then((data) => {
        setDataPais(data);
      });
      await services.getCursos().then((data) => {
        setDataCursos(data);
      });
    }
    fetchData();
    AOS.init();
  }, []);

  //CONSTANTES DE ABSTRACCION DE DATOS

  // eliminar acentos, eñes y números
  const limpiarTexto = (texto) => {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ñ/g, "n")
      .replace(/[0-9]/g, "")
      .replace(/[^A-Za-z]/g, "");
  };
  const obtenerFechaDeHoy = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    let mes = hoy.getMonth() + 1;
    if (mes < 10) {
      mes = `0${mes}`;
    }
    let dia = hoy.getDate();
    if (dia < 10) {
      dia = `0${dia}`;
    }
    const horas = hoy.getHours();
    const minutos = hoy.getMinutes();
    const segundos = hoy.getSeconds();
    const milisegundos = hoy.getMilliseconds();

    const fechaDeHoy = `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}.${milisegundos}+00:00`;
    return fechaDeHoy;
  };

  const obtenerIdPaisPorValor = (valorPais, dataPaises) => {
    const paisEncontrado = dataPaises.find((pais) => pais.pais === valorPais);
    return paisEncontrado ? paisEncontrado.id_pais : null;
  };
  //  HANDLES DE INTERACCION
  const handleClose = () => setShowUsuario(false);
  const handleClosePE = () => setShowUsuarioPE(false);
  const handleCloseMatricula = () => setShowMatriculas(false);
  const handleCloseEditUser = () => setShowEdit(false);
  const handleCloseCrear1 = () => setShowCrear1(false);
  const handleCloseCrearCursos = () => setShowCrearCursos(false);
  const handleCloseEditCurso = () => setShowEditCurso(false);

  const handleRadioChange = (event) => {
    console.log(event);
    setFiltro(event);
  };

  //EVITAR ESCRITURA
  const handleKeyPress = (e) => {
    const inputValue = e.target.value;
    const charCode = e.which || e.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^[A-Za-z\s]*$/.test(charStr) || inputValue.length >= 30) {
      e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const sanitizedValue = inputValue.replace(/[áéíóúÁÉÍÓÚ]/g, "");
    e.target.value = sanitizedValue;
  };

  const handleNombreChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^\p{L}\s]/gu, "");
    setUsuarioNombreEdit(cleanedValue);
  };

  const handleApellidoChange = (e) => {
    const cleanedValue = e.target.value.replace(/[^\p{L}\s]/gu, "");
    setUsuarioApellidoEdit(cleanedValue);
  };

  const handleSubmit = () => {
    if (!usuarioNombreEdit || !usuarioApellidoEdit) {
      alert("Por favor, ingrese un nombre y un apellido.");
      return;
    }
    if (!usuarioPaisEdit || !usuarioRolEdit) {
      alert("Por favor, seleccione un país y un rol.");
      return;
    }
  };
  const handleShowCrearUsuario = () => {
    setUsuarioEdit("");
    setUsuarioContraseñaEdit("");
    setUsuarioRolEdit("");
    setUsuarioDniEdit("");
    setUsuarioNombreEdit("");
    setUsuarioApellidoEdit("");
    setUsuarioTelefonoEdit("");
    setUsuarioDireccionEdit("");
    setUsuarioFNEdit("");
    setUsuarioPaisEdit("");
    setShowCrear1(true);
  };

  const handleShowCrearCursos = () => {
    setCursoAñadir("");
    setShowCrearCursos(true);
  };

  const handleEditCurso = (id) => {
    setIdCursoTableSelect(id);
    setShowEditCurso(true);
  };
  const handleEditClick = (usuario) => {
    console.log(usuario.rol);
    setShowEdit(true);
    setUsuarioEdit(usuario.usuario || "");
    setUsuarioContraseñaEdit(usuario.contrasena || "");
    setUsuarioRolEdit(usuario.rol.nombre || "");
    setUsuarioDniEdit(usuario.persona.dni || "");
    setUsuarioNombreEdit(usuario.persona.nombre || "");
    setUsuarioApellidoEdit(usuario.persona.apellido || "");
    setUsuarioTelefonoEdit(usuario.persona.telefono || "");
    setUsuarioDireccionEdit(usuario.persona.direccion || "");
    setUsuarioFNEdit(usuario.persona.fecha_nacimiento || "");
    setUsuarioPaisEdit(usuario.persona.pais ? usuario.persona.pais.pais : null);

    setObjectUserEdit(usuario);
  };
  const handleBorrarClick = async (usuario) => {
    const id = usuario.id_usuario;
    setObjectUserEdit(usuario);
    try {
      await services.deleteUserById(id).then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Eliminado con Exito",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } catch (error) {
      Swal.fire({
        title: "Error en el Servidor",
        text: error.response.data,
        icon: "error",
      });
    } finally {
      try {
        const data = await services.getUsers();
        setDataUsers(data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    }
  };

  const handleBorrarCurso = async (id) => {
    try {
      await services.deleteCursoById(id).then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Eliminado con Exito",
          showConfirmButton: false,
          timer: 1500,
        });
      });
      const data = await services.getCursos();
      setDataCursos(data);
    } catch (error) {
      Swal.fire({
        title: "El Curso Tiene Usuarios Asignados, no puede eliminarlo",
        text: error.response.data,
        icon: "error",
      });
    } finally {
      const data = await services.getCursos();
      setDataCursos(data);
    }
  };
  const handleMatriculaClick = (usuario) => {
    setShowMatriculas(true);
    obtenerMatriculasPorUser(usuario.id_usuario);
    setObjectUserEdit(usuario);
  };

  const handleBorrarMatricula = async (matricula) => {
    console.log(matricula);
    const id = matricula.id_matricula;
    try {
      await services.deleteMatriculaById(id).then((data) => {
        console.log(data);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Eliminada con Exito",
          confirmButtonText: "ok",
        }).then((result) => {
          if (result.isConfirmed) {
            services
              .getMatriculasByUsuario(matricula.usuario.id_usuario)
              .then((data) => {
                const meses = [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ];

                const dataFormated = data.map((matricula) => {
                  const fecha = new Date(matricula.fecha);
                  const nombreMes = meses[fecha.getMonth()];
                  const fechaFormateada = `${fecha.getDate()} de ${nombreMes} de ${fecha.getFullYear()}`;
                  return {
                    ...matricula,
                    fecha: fechaFormateada,
                  };
                });

                setDataMatriculasByUsuario(dataFormated);
              });
          }
        });
      });
    } catch (error) {
      Swal.fire({
        title: "Error en el Servidor",
        text: error.response.data,
        icon: "error",
      });
    } finally {
      const data = await services.getMatriculasByUsuario(
        matricula.usuario.id_usuario
      );
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const dataFormated = data.map((matricula) => {
        const fecha = new Date(matricula.fecha);
        const nombreMes = meses[fecha.getMonth()];
        const fechaFormateada = `${fecha.getDate()} de ${nombreMes} de ${fecha.getFullYear()}`;

        return {
          ...matricula,
          fecha: fechaFormateada,
        };
      });
      setDataMatriculasByUsuario(dataFormated);
    }
  };

  /* ----- FUNCIONES ------*/

  //Encontrar persona Existente
  const findDNI = async (dni) => {
    try {
      await services.getPersonByDni(dni).then((data) => {
        if (data) {
          Swal.fire({
            title: "Registrar Usuario",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Registrar Persona",
            icon: "success",
          });
        }
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        Swal.fire({
          title: "Error en el Servidor",
          text: error.response.data,
          icon: "error",
        });
      }
    }
  };
  // CARGAR USUARIOS EN LA TABLA
  function renderUsuarios(usuarios) {
    let usuariosFiltrados;
    if (filtro === "estdts") {
      usuariosFiltrados = usuarios.filter((usuario) => usuario.rol.id === 3);
      console.log(usuariosFiltrados);
    } else if (filtro === "prfsrs") {
      usuariosFiltrados = usuarios.filter((usuario) => usuario.rol.id === 2);
      console.log(usuariosFiltrados);
    }

    return usuariosFiltrados.map((usuario, index) => (
      <tr key={index} data-status="active">
        <td>{index}</td>
        <td>{usuario.persona.dni}</td>
        <td>{usuario.persona.nombre}</td>
        <td>{usuario.correo}</td>
        <td>
          <span className="label label-success">{usuario.usuario}</span>
        </td>
        <td className="button-container">
          <OverlayTrigger
            overlay={<Tooltip id={`edit-tooltip-${index}`}>Editar</Tooltip>}
          >
            <a
              onClick={() => handleEditClick(usuario)}
              href="#"
              className="btn"
              style={{ color: "#007bff" }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </a>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={<Tooltip id={`delete-tooltip-${index}`}>Borrar</Tooltip>}
          >
            <a
              onClick={() => handleBorrarClick(usuario)}
              href="#"
              className="btn"
            >
              <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#dc3545" }} />
            </a>
          </OverlayTrigger>
          <OverlayTrigger
            overlay={
              <Tooltip id={`matricular-tooltip-${index}`}>
                Matricular Curso
              </Tooltip>
            }
          >
            <a
              onClick={() => handleMatriculaClick(usuario)}
              href="#"
              className="btn"
              style={{ color: "#28a745" }}
            >
              <FontAwesomeIcon icon={faBook} />
            </a>
          </OverlayTrigger>
        </td>
      </tr>
    ));
  }

  // CARGAR CURSOS EN LA TABLA

  function renderCursos() {
    const cursos = dataCursos;
    return cursos.map((curso, index) => (
      <tr key={index} data-status="active">
        <td>{curso.id_curso}</td>
        <td>{curso.nombre_curso}</td>

        <td className="button-container">
          <OverlayTrigger overlay={<Tooltip>Editar</Tooltip>}>
            <a
              onClick={() => {
                handleEditCurso(curso.id_curso);
              }}
              href="#"
              className="btn"
              style={{ color: "#007bff" }}
            >
              <FontAwesomeIcon icon={faEdit} />
            </a>
          </OverlayTrigger>
          <OverlayTrigger overlay={<Tooltip>Borrar</Tooltip>}>
            <a
              onClick={() => {
                handleBorrarCurso(curso.id_curso);
              }}
              href="#"
              className="btn"
            >
              <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#dc3545" }} />
            </a>
          </OverlayTrigger>
        </td>
      </tr>
    ));
  }

  //EJECUTAR EDITAR CURSO
  async function editCurso(id) {
    try {
      await services.putCursoById(id, cursoAñadir);
      Swal.fire({
        title: "Curso Actualizado",
        icon: "success",
      });
      setShowEditCurso(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        Swal.fire({
          title: "Error en el Servidor",
          text: error.response.data,
          icon: "error",
        });
      }
    } finally {
      const data = await services.getCursos();
      setDataCursos(data);
      // window.location.reload();
    }
  }
  //EJECUTAR EDITAR USUARIO

  async function editUsuario(usuario) {
    let rol;
    let pais;
    if (changeRolEdit == true) {
      rol = usuarioRolEditSelect;
    } else {
      rol = objectUserEdit.rol;
    }
    if (changePaisEdit == true) {
      pais = usuarioPaisEditSelect;
    } else {
      pais = objectUserEdit.pais;
    }

    const usuario2 = {
      usuario: usuarioEdit,
      contrasena: usuarioContraseñaEdit,
      persona: usuario.persona,
      rol: rol,
    };

    const persona = {
      dni: usuarioDniEdit,
      nombre: usuarioNombreEdit,
      apellido: usuarioApellidoEdit,
      telefono: parseFloat(usuarioTelefonoEdit),
      direccion: usuarioDireccionEdit,
      fecha_nacimiento: usuarioFNEdit,
      pais: pais,
    };
    try {
      console.log(usuario2);

      await services.putUsersById(usuario.id_usuario, usuario2);
      await services.putPersonsById(usuario.persona.id_persona, persona);
      Swal.fire({
        title: "Usuario Actualizado",
        icon: "success",
      });
      const data = await services.getUsers();
      setDataUsers(data);
      setShowEdit(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        Swal.fire({
          title: "Error en el Servidor",
          text: error.response.data,
          icon: "error",
        });
      }
    } finally {
      const data = await services.getUsers();
      setDataUsers(data);
      // window.location.reload();
    }
  }
  //COMPROBAR PERSONA

  async function crearUsuarioOption() {
    try {
      const data = await services.getPersonsByDni(usuarioDniEdit || 0);
      if (!data) {
        setShowUsuario(true);
        setShowCrear1(false);
      } else {
        Swal.fire({
          title: "La Persona Que Desea Registrar Ya Tiene un Usuario Asignado, ¿DESEA CREARLE OTRO USUARIO?",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "No",
          confirmButtonText: "Si",
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            setShowUsuarioPE(true);
          } else if (
            result.dismiss === Swal.DismissReason.cancel
          ) {
            setShowCrear1(false)
          }
        });
      }
    } catch (error) {
      console.error("Error al obtener la persona:", error);
    }
    handleCloseCrear1();
  }

  //CREAR CURSO
  async function crearCurso() {
    try {
      await services.postCurso(cursoAñadir);
      Swal.fire({
        title: "Curso Creado",
        icon: "success",
      });
      handleCloseCrearCursos();
    } catch (error) {
      if (error.response) {
        Swal.fire({
          title: "Error en el Servidor",
          text: error.response.data,
          icon: "error",
        });
      }
    } finally {
      try {
        const data = await services.getCursos();
        setDataCursos(data);
        //  window.location.reload();
      } catch (error) {
        console.error("Error al obtener cursos:", error);
      }
    }
  }
  //CREAR USUARIO SI LA PERSONA NO EXISTE

  async function crearUsuario() {
    try {
      const persona = {
        dni: usuarioDniEdit,
        nombre: usuarioNombreEdit,
        apellido: usuarioApellidoEdit,
        telefono: parseFloat(usuarioTelefonoEdit),
        direccion: usuarioDireccionEdit,
        fecha_nacimiento: usuarioFNEdit,
        pais: usuarioPaisEditSelect,
      };

      await services.postPersona(persona);

      const personaCreada = await services.getPersonsByDni(usuarioDniEdit);

      const idPersona = personaCreada.id_persona;

      console.log(personaCreada);
      persona.id_persona = idPersona;

      const usuario2 = {
        usuario: usuarioEdit,
        contrasena: usuarioContraseñaEdit,
        correo: usarioCorreoEdit,
        persona: personaCreada,
        rol: usuarioRolEditSelect,
      };

      await services.postUsuario(usuario2);
      Swal.fire({
        title: "Usuario Creado",
        icon: "success",
      });
      setShowUsuario(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        Swal.fire({
          title: "Error en el Servidor",
          text: error.response.data,
          icon: "error",
        });
      }
    } finally {
      try {
        const data = await services.getUsers();
        setDataUsers(data);
        //  window.location.reload();
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    }
  }
  //CREAR USUARIO SI LA PERSONA EXISTE

  async function crearUsuarioOnly() {
    try {
      const personaCreada = await services.getPersonsByDni(usuarioDniEdit);

      const usuario2 = {
        usuario: usuarioEdit,
        contrasena: usuarioContraseñaEdit,
        correo: usarioCorreoEdit,
        persona: personaCreada,
        rol: usuarioRolEditSelect,
      };

      await services.postUsuario(usuario2);
      Swal.fire({
        title: "Usuario Creado",
        icon: "success",
      });
      handleClosePE();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        Swal.fire({
          title: "Error en el Servidor",
          text: error.response.data,
          icon: "error",
        });
      }
    } finally {
      try {
        const data = await services.getUsers();
        setDataUsers(data);
        //  window.location.reload();
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    }
  }

  // OBTENER MATRICULAS POR ESTUDIANTES

  async function obtenerMatriculasPorUser(idUsuario) {
    await services.getMatriculasByUsuario(idUsuario).then((data) => {
      const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ];
      const dataFormated = data.map((matricula) => {
        const fecha = new Date(matricula.fecha);
        const nombreMes = meses[fecha.getMonth()];
        const fechaFormateada = `${fecha.getDate()} de ${nombreMes} de ${fecha.getFullYear()}`;

        return {
          ...matricula,
          fecha: fechaFormateada,
        };
      });
      setDataMatriculasByUsuario(dataFormated);
      console.log(data);
    });
  }

  //GENERAR TABLA DE LA MATRICULA
  const TablaMatricula = () => {
    return dataMatriculasByUsuario.map((matricula, index) => (
      <tr key={index} data-status="active">
        <td>{matricula.usuario.usuario}</td>
        <td>{matricula.curso.nombre_curso}</td>
        <td>{matricula.usuario.persona.dni}</td>
        <td>{matricula.usuario.persona.nombre}</td>
        <td>{matricula.fecha}</td>
        <td className="button-container">
          <OverlayTrigger
            overlay={<Tooltip id={`delete-tooltip-${index}`}>Borrar</Tooltip>}
          >
            <a
              onClick={() => handleBorrarMatricula(matricula)}
              href="#"
              className="btn"
            >
              <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#dc3545" }} />
            </a>
          </OverlayTrigger>
        </td>
      </tr>
    ));
  };

  async function PostMatricula() {
    const usuario = objectUserEdit;
    const matricula = {
      fecha: obtenerFechaDeHoy,
      curso: cursoEditSelect,
      usuario,
    };
    console.log(matricula);
    try {
      await services.postMatricula(matricula);
      Swal.fire({
        title: "Curso Matriculado",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error en el Servidor",
        icon: "error",
      });
    } finally {
      await services.getMatriculasByUsuario(usuario.id_usuario).then((data) => {
        const meses = [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
          "Octubre",
          "Noviembre",
          "Diciembre",
        ];
        const dataFormated = data.map((matricula) => {
          const fecha = new Date(matricula.fecha);
          const nombreMes = meses[fecha.getMonth()];
          const fechaFormateada = `${fecha.getDate()} de ${nombreMes} de ${fecha.getFullYear()}`;

          return {
            ...matricula,
            fecha: fechaFormateada,
          };
        });
        setDataMatriculasByUsuario(dataFormated);
        console.log(data);
      });
    }
  }

  return (
    <div className="home2">
      <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex align-items-center">
          <h1 className="logo me-auto">
            <a href="index.html">
              EduGestorFT{" "}
              <img
                src="assets/img/logo-s-fondo.png"
                alt="Logo de EduGestorFT"
              />
            </a>
          </h1>
          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <li>
                <a className="nav-link scrollto active" href="#anadirUsuario">
                  GESTION DE USUARIOS
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#editarUsuario"></a>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle" />
          </nav>
          <div className="social-links">
            <a
              href="https://www.facebook.com/profile.php?id=61559059859802"
              className="facebook"
            >
              <i className="bi bi-facebook" />
            </a>
          </div>
        </div>
      </header>

      {/*
      AÑADIR USUARIO SECCION 
      */}
      {/*-----------------------------------GESTION DE USUARIOS------------- */}

      <section id="anadirusuario" className="clearfix">
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>
                      Gestionar <b>USUARIOS</b>
                    </h2>
                  </div>
                  <div className="col-sm-6">
                    <div className="btn-group" data-toggle="buttons">
                      <label className="btn btn-info active">
                        <input
                          type="radio"
                          name="status"
                          defaultValue="all"
                          checked={filtro === "estdts"}
                          onChange={(e) => handleRadioChange("estdts")}
                          defaultChecked="checked"
                        />{" "}
                        Estudiantes
                      </label>
                      <label className="btn btn-success">
                        <input
                          type="radio"
                          name="status"
                          checked={filtro === "prfsrs"}
                          onChange={(e) => handleRadioChange("prfsrs")}
                          defaultValue="active"
                        />{" "}
                        Profesores
                      </label>
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="plus-tooltip">Añadir Usuario</Tooltip>
                        }
                      >
                        <a
                          href="#"
                          className="btn"
                          onClick={(e) => {
                            handleShowCrearUsuario();
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            style={{ color: "#CCCCCC", fontSize: "24px" }}
                          />
                        </a>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Correo</th>
                    <th>Usuario</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>{renderUsuarios(dataUsers)}</tbody>
              </table>
            </div>
          </div>
        </div>
        {/*-----------------------------------GESTION DE CURSOS------------- */}
        <div className="container-xl">
          <div className="table-responsive">
            <div className="table-wrapper">
              <div className="table-title">
                <div className="row">
                  <div className="col-sm-6">
                    <h2>
                      Gestionar <b>CURSOS</b>
                    </h2>
                  </div>
                  <div className="col-sm-6">
                    <div className="btn-group" data-toggle="buttons">
                      <OverlayTrigger
                        overlay={
                          <Tooltip id="plus-tooltip">Añadir Cursos</Tooltip>
                        }
                      >
                        <a
                          href="#"
                          className="btn"
                          onClick={(e) => {
                            handleShowCrearCursos();
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPlusCircle}
                            style={{ color: "#CCCCCC", fontSize: "24px" }}
                          />
                        </a>
                      </OverlayTrigger>
                    </div>
                  </div>
                </div>
              </div>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Curso</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>{renderCursos()}</tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/*
      SECCIONES
      */}

      {/*     MODALES     */}

      {/*---------CREAR USUARIO MODAL CUANDO PERSONA NO EXISTE-----------*/}

      <Modal show={showUsuario} onHide={handleClose}>
        <Modal.Body>
          <div
            className="panel panel-default order-lg-first order-last"
            data-aos="fade-up"
          >
            <div className="panel-body">
              <form className="form-horizontal">
                <div className="panel panel-default">
                  <div className="panel-body text-center">
                    <img
                      src="assets/img/img-add-user.jpg"
                      className="img-circle-form-user-edit"
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="form-group">
                      <label className="control-label">Usuario </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioEdit}
                          onChange={(e) => setUsuarioEdit(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Contraseña </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioContraseñaEdit}
                          onChange={(e) =>
                            setUsuarioContraseñaEdit(e.target.value)
                          }
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Rol </label>
                      <div className="col-sm-10">
                        <select
                          value={usuarioRolEdit}
                          onChange={(e) => {
                            setUsuarioRolEdit(e.target.value);
                            setUsuarioRolEditSelect({
                              id: e.target.selectedIndex,
                              nombre: e.target.value,
                            });
                          }}
                          className="form-control"
                        >
                          <option value="">Selecciona un Rol</option>
                          {dataRoles.map((rol) => (
                            <option key={rol.id} value={rol.nombre}>
                              {rol.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label className="control-label">DNI </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioDniEdit}
                          onChange={(e) => setUsuarioDniEdit(e.target.value)}
                          type="number"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Nombre </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioNombreEdit}
                          onKeyDown={(e) => handleKeyPress(e)}
                          onChange={(e) => handleNombreChange(e)}
                          onInput={(e) => handleInputChange(e)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Apellido </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioApellidoEdit}
                          onKeyDown={(e) => handleKeyPress(e)}
                          onChange={(e) => handleApellidoChange(e)}
                          onInput={(e) => handleInputChange(e)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Telefono </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioTelefonoEdit}
                          onChange={(e) =>
                            setUsuarioTelefonoEdit(e.target.value)
                          }
                          type="number"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Direccion </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioDireccionEdit}
                          onChange={(e) =>
                            setUsuarioDireccionEdit(e.target.value)
                          }
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Fecha Nacimiento </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioFNEdit}
                          onChange={(e) => setUsuarioFNEdit(e.target.value)}
                          type="date"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Pais </label>
                      <div className="col-sm-10">
                        <select
                          value={usuarioPaisEdit}
                          onChange={(e) => {
                            const id_pais = obtenerIdPaisPorValor(
                              e.target.value,
                              dataPaises
                            );
                            setUsuarioPaisEdit(e.target.value);
                            setUsuarioPaisEditSelect({
                              id_pais: id_pais,
                              pais: e.target.value,
                            });
                            console.log(id_pais);
                          }}
                          className="form-control"
                        >
                          <option value="">Selecciona un país</option>
                          {dataPaises.map((pais) => (
                            <option key={pais.id_pais} value={pais.pais}>
                              {pais.pais}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="container-buttons">
                        <button
                          onClick={(e) => {
                            crearUsuario();
                          }}
                          type="submit"
                          className="button button-blue "
                        >
                          Guardar Usuario
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="col-lg-6 intro-img order-lg-last order-first"
            data-aos="zoom-out"
            data-aos-delay={100}
          ></div>{" "}
        </Modal.Body>
      </Modal>
      {/* MODAL CREAR USUARIO CUANDO PERSONA YA EXISTE */}
      <Modal show={showUsuarioPE} onHide={handleClosePE}>
        <Modal.Body>
          <div
            className="panel panel-default order-lg-first order-last"
            data-aos="fade-up"
          >
            <div className="panel-body">
              <form className="form-horizontal">
                <div className="panel panel-default">
                  <div className="panel-body text-center">
                    <img
                      src="assets/img/img-edit-user.jpg"
                      className="img-circle-form-user-edit"
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="form-group">
                      <label className="control-label">Usuario </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioEdit}
                          onChange={(e) => setUsuarioEdit(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Contraseña </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioContraseñaEdit}
                          onChange={(e) =>
                            setUsuarioContraseñaEdit(e.target.value)
                          }
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Rol </label>
                      <div className="col-sm-10">
                        <select
                          value={usuarioRolEdit}
                          onChange={(e) => {
                            setUsuarioRolEdit(e.target.value);
                            setUsuarioRolEditSelect({
                              id: e.target.selectedIndex,
                              nombre: e.target.value,
                            });
                          }}
                          className="form-control"
                        >
                          <option value="">Selecciona un Rol</option>
                          {dataRoles.map((rol) => (
                            <option key={rol.id} value={rol.nombre}>
                              {rol.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="container-buttons">
                        <button
                          onClick={(e) => {
                            crearUsuarioOnly();
                          }}
                          type="submit"
                          className="button button-blue "
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="col-lg-6 intro-img order-lg-last order-first"
            data-aos="zoom-out"
            data-aos-delay={100}
          ></div>{" "}
        </Modal.Body>
      </Modal>
      {/*---------EDITAR MODAL USUARIO-----------*/}
      <Modal show={showEdit} onHide={handleCloseEditUser}>
        <Modal.Body>
          <div
            className="panel panel-default order-lg-first order-last"
            data-aos="fade-up"
          >
            <div className="panel-body">
              <form className="form-horizontal">
                <div className="panel panel-default">
                  <div className="panel-body text-center">
                    <img
                      src="assets/img/img-edit-user.jpg"
                      className="img-circle-form-user-edit"
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="form-group">
                      <label className="control-label">Usuario </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioEdit}
                          onChange={(e) => setUsuarioEdit(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Contraseña </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioContraseñaEdit}
                          onChange={(e) =>
                            setUsuarioContraseñaEdit(e.target.value)
                          }
                          type="text"
                          className="form-control"
                        />
                      </div>

                      <label className="control-label">Rol </label>
                      <div className="col-sm-10">
                        <select
                          value={usuarioRolEdit}
                          onChange={(e) => {
                            setChangeRolEdit(true);
                            setUsuarioRolEdit(e.target.value);
                            setUsuarioRolEditSelect({
                              id: e.target.selectedIndex,
                              nombre: e.target.value,
                            });
                          }}
                          className="form-control"
                        >
                          <option value="">Selecciona un Rol</option>
                          {dataRoles.map((rol) => (
                            <option key={rol.id} value={rol.nombre}>
                              {rol.nombre}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label className="control-label">DNI </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioDniEdit}
                          onChange={(e) => setUsuarioDniEdit(e.target.value)}
                          type="number"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Nombre </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioNombreEdit}
                          onKeyDown={(e) => handleKeyPress(e)}
                          onInput={(e) => handleInputChange(e)}
                          onChange={(e) => handleNombreChange(e)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Apellido </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioApellidoEdit}
                          onKeyDown={(e) => handleKeyPress(e)}
                          onChange={(e) => handleApellidoChange(e)}
                          onInput={(e) => handleInputChange(e)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Telefono </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioTelefonoEdit}
                          onChange={(e) =>
                            setUsuarioTelefonoEdit(e.target.value)
                          }
                          type="number"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Direccion </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioDireccionEdit}
                          onChange={(e) =>
                            setUsuarioDireccionEdit(e.target.value)
                          }
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Fecha Nacimiento </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioFNEdit}
                          onChange={(e) => setUsuarioFNEdit(e.target.value)}
                          type="date"
                          className="form-control"
                        />
                      </div>
                      <label className="control-label">Pais </label>
                      <div className="col-sm-10">
                        <select
                          value={usuarioPaisEdit}
                          onChange={(e) => {
                            const id_pais = obtenerIdPaisPorValor(
                              e.target.value,
                              dataPaises
                            );
                            setChangePaisEdit(true);
                            setUsuarioPaisEdit(e.target.value);
                            setUsuarioPaisEditSelect({
                              id_pais: id_pais,
                              pais: e.target.value,
                            });
                          }}
                          className="form-control"
                        >
                          <option value="">Selecciona un país</option>
                          {dataPaises.map((pais) => (
                            <option key={pais.id_pais} value={pais.pais}>
                              {pais.pais}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="container-buttons">
                        <button
                          onClick={(e) => {
                            editUsuario(objectUserEdit);
                          }}
                          type="submit"
                          className="button button-blue "
                        >
                          Actualizar Usuario
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="col-lg-6 intro-img order-lg-last order-first"
            data-aos="zoom-out"
            data-aos-delay={100}
          ></div>{" "}
        </Modal.Body>
      </Modal>
      {/*---------EDITAR MODAL CURSO-----------*/}
      <Modal show={showEditCurso} onHide={handleCloseEditCurso}>
        <Modal.Body>
          <div
            className="panel panel-default order-lg-first order-last"
            data-aos="fade-up"
          >
            <div className="panel-body">
              <form className="form-horizontal">
                <div className="panel panel-default">
                  <div className="panel-body text-center">
                    <img
                      src="assets/img/img-edit-user.jpg"
                      className="img-circle-form-user-edit"
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="form-group">
                      <label className="control-label">Cambiar Curso </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={cursoAñadir}
                          onChange={(e) => setCursoAñadir(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="container-buttons">
                        <button
                          onClick={(e) => {
                            editCurso(idCursoTableSelect);
                          }}
                          type="submit"
                          className="button button-blue "
                        >
                          Actualizar Usuario
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="col-lg-6 intro-img order-lg-last order-first"
            data-aos="zoom-out"
            data-aos-delay={100}
          ></div>{" "}
        </Modal.Body>
      </Modal>
      {/*   MODAL CREACION DE USUARIO - 1 */}
      <Modal show={showCrear1} onHide={handleCloseCrear1}>
        <Modal.Body>
          <div
            className="panel panel-default order-lg-first order-last"
            data-aos="fade-up"
          >
            <div className="panel-body">
              <form className="form-horizontal">
                <div className="panel panel-default">
                  <div className="panel-body text-center">
                    <img
                      src="assets/img/img-add-user.jpg"
                      className="img-circle-form-user-edit"
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="form-group">
                      <label className="control-label">ingrese el DNI </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={usuarioDniEdit}
                          onChange={(e) => setUsuarioDniEdit(e.target.value)}
                          type="number"
                          className="form-control"
                        />
                      </div>
                      <div className="container-buttons">
                        <button
                          onClick={(e) => {
                            crearUsuarioOption();
                          }}
                          type="submit"
                          className="button button-blue "
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="col-lg-6 intro-img order-lg-last order-first"
            data-aos="zoom-out"
            data-aos-delay={100}
          ></div>{" "}
        </Modal.Body>
      </Modal>

      {/*   MODAL MATRICULAS */}
      <Modal
        show={showMatriculas}
        onHide={handleCloseMatricula}
        className="modal-lg"
      >
        <Modal.Body>
          <div className="modal-header">
            <h5 className="modal-title">Gestionar Matriculas</h5>
          </div>
          <div className="panel" data-aos="fade-up">
            <div className="panel panel-default">
              <div className="panel-body text-center">
                <img
                  src="assets/img/img-edit-user.jpg"
                  className="img-circle-form-user-edit"
                  alt="User avatar"
                />
              </div>
            </div>
            <label className="control-label">
              Escoja el Curso que Desea Matricular
            </label>
            <div className="row align-items-center">
              <div className="col-md-6">
                <select
                  value={cursoSelect}
                  onChange={(e) => {
                    setCursoSelect(e.target.value);
                    setCursoEditSelect({
                      id_curso: e.target.selectedIndex,
                      nombre_curso: e.target.value,
                    });
                  }}
                  className="form-control"
                >
                  <option value="">Selecciona un Curso</option>
                  {dataCursos.map((curso) => (
                    <option key={curso.id_curso} value={curso.nombre_curso}>
                      {curso.nombre_curso}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6  d-flex justify-content-start">
                <OverlayTrigger overlay={<Tooltip>Matricular</Tooltip>}>
                  <a
                    href="#"
                    className="btn"
                    onClick={(e) => {
                      PostMatricula();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPlusCircle}
                      style={{ color: "#CCCCCC", fontSize: "30px" }}
                    />
                  </a>
                </OverlayTrigger>
              </div>
            </div>
            <div class="table-responsive">
              <table
                className="table table-striped table-hover custom-table"
                style={{ whiteSpace: "nowrap" }}
              >
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Curso</th>
                    <th>DNI</th>
                    <th>Nombre</th>
                    <th>Fecha de Matricula</th>
                  </tr>
                </thead>
                <tbody>{TablaMatricula()}</tbody>
              </table>
            </div>
            <div className="container-buttons">
              <button
                onClick={(e) => {}}
                type="submit"
                className="button button-blue "
              >
                Siguiente
              </button>
            </div>
          </div>
          <div
            className="col-lg-6 intro-img order-lg-last order-first"
            data-aos="zoom-out"
            data-aos-delay={100}
          ></div>{" "}
        </Modal.Body>
      </Modal>
      {/*   MODAL CREACION DE CURSOS - 1 */}
      <Modal show={showCrearCursos} onHide={handleCloseCrearCursos}>
        <Modal.Body>
          <div
            className="panel panel-default order-lg-first order-last"
            data-aos="fade-up"
          >
            <div className="panel-body">
              <form className="form-horizontal">
                <div className="panel panel-default">
                  <div className="panel-body text-center">
                    <img
                      src="assets/img/img-edit-user.jpg"
                      className="img-circle-form-user-edit"
                      alt="User avatar"
                    />
                  </div>
                </div>
                <div className="panel panel-default">
                  <div className="panel-body">
                    <div className="form-group">
                      <label className="control-label">
                        Ingresa el Nombre del Curso
                      </label>
                      <div className="col-sm-10">
                        <input
                          placeholder={cursoAñadir}
                          onChange={(e) => setCursoAñadir(e.target.value)}
                          type="text"
                          className="form-control"
                        />
                      </div>
                      <div className="container-buttons">
                        <button
                          onClick={(e) => {
                            crearCurso();
                          }}
                          type="submit"
                          className="button button-blue "
                        >
                          Siguiente
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div
            className="col-lg-6 intro-img order-lg-last order-first"
            data-aos="zoom-out"
            data-aos-delay={100}
          ></div>{" "}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home2;
