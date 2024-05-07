import axios from "axios";

class ServiceLogin {
   constructor() {
    this.baseUrl = 'http://localhost:8080/api/v1';
  }
  /* GETTERS */
  getLogin = (usuario, contrasena) => {
    const data = {
      usuario: usuario,
      contrasena: contrasena,
    };
    return new Promise((resolve, reject) => {
      console.log(data);
      axios
        .post(`${this.baseUrl}/loginUsuario`, data)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getPersonsByDni = (dni) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}/getPersonByDni/${dni}`)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getUsersByRol = (idRol) => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}/getUsersByRol/${idRol}`)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  getUsers = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}/getUsuarios`)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getRoles = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}/getRoles`)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getCursos = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}/getCursos`)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getPaises = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.baseUrl}/getPaises`)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getMatriculasByUsuario = (usuario) => {

    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}/getMatriculasByUsuario`, {
          id_usuario: usuario,
        })
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  /* POST */

  postPersona = (persona) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}/postPersona`, persona)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  postCurso = (cursoNombre) => {
    const curso ={
      nombre_curso: cursoNombre
    }
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}/postCurso`, curso)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  postUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}/postUsuario`, usuario)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  postMatricula = (matricula) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.baseUrl}/postMatricula`, matricula)
        .then((Response) => {
          resolve(Response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  /* PUT */
  putUsersById = (idUsuario, usuario) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.baseUrl}/putUsuarios/${idUsuario}`, usuario)
        .then(resolve(Response.data))
        .catch((error) => {
          reject(error);
        });
    });
  };

  putPersonsById = (idPersona, persona) => {
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.baseUrl}/putPersona/${idPersona}`, persona)
        .then(resolve(Response.data))
        .catch((error) => {
          reject(error);
        });
    });
  };

  putCursoById = (id,curso) => {
    const cuerpoCurso = {
      nombre_curso: curso
    }
    return new Promise((resolve, reject) => {
      axios
        .put(`${this.baseUrl}/putCurso/${id}`, cuerpoCurso)
        .then(resolve(Response.data))
        .catch((error) => {
          reject(error);
        });
    });
  };
  /* DELETE*/
  deleteUserById = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.baseUrl}/deleteUser/${id}`)
        .then(resolve(Response.data))
        .catch((error) => reject(error));
    });
  };
  
  deleteMatriculaById = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.baseUrl}/deleteMatricula/${id}`)
        .then(resolve(Response.data))
        .catch((error) => reject(error));
    });
  };
  deleteCursoById = (id) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.baseUrl}/deleteCursoById/${id}`)
        .then(resolve(Response.data))
    });
  };
}
export default ServiceLogin;
