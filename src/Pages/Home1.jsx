import "../App.css";
import React, { useEffect, useState } from "react";
import "aos/dist/aos.css";
import  ServiceLogin from "../Services/Services";
import AOS from "aos";
import { BrowserRouter as Router, Routes, Route,useNavigate  } from 'react-router-dom';
import Swal from 'sweetalert2'

function Home1() {
  const [userLogin, setUserLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const serviceLogin = new ServiceLogin();

  const navigate = useNavigate();

  const handleLogin2 = async (e) => {
    try {
      e.preventDefault();

      await serviceLogin.getLogin(userLogin,passwordLogin).then(() => {
        Swal.fire({
          title: 'Login exitoso',
          icon: 'success',
        });
      });

      navigate("/home2");
    } catch (error) {
      if (error.response) {
        
        console.log(error.response.data); 
        console.log(error.response.status); 
        Swal.fire({
          title: 'Error en el Proceso de Login',
          text: error.response.data, 
          icon: 'error',
        });
      }
    }
  };
  useEffect(() => {
    AOS.init();

  }, []);
  return (
    <div className="App">
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
                <a className="nav-link scrollto active" href="#hero">
                  Home
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#about">
                  Nosotros
                </a>
              </li>
              <li>
                <a className="nav-link scrollto" href="#contact">
                  Contacto
                </a>
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
      {/* End Header */}
      <section id="hero" className="clearfix">
        <div className="container d-flex h-100">
          <div
            className="row justify-content-center align-self-center"
            data-aos="fade-up"
          >
            <div
              className="col-lg-6 intro-info order-lg-first order-last"
              data-aos="zoom-in"
              data-aos-delay={200}
            >
              <h2 className="mt-0 mb-4">
                EduGestorFT,
                <br />
                para la gestión de tu <span>¡Institución Educativa!</span>
              </h2>
              <div>
                <h3 className="mt-5">¿Ya tienes cuenta?</h3>
                <a href="#login" className="btn-get-started scrollto">
                  INICIA SESIÓN
                </a>
              </div>
            </div>
            <div
              className="col-lg-6 intro-img order-lg-last order-first"
              data-aos="zoom-out"
              data-aos-delay={100}
            >
              <img
                src="assets/img/intro-img.png"
                alt="Ícono de cuadro de diálogo"
                style={{ maxWidth: "130%" }}
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>
      {/* End Hero */}
      <section id="about" className="about">
        <div className="container dflex h-100" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="col-lg-7 col-md-6">
              <div
                className="about-img"
                data-aos="fade-right"
                data-aos-delay={100}
              >
                <img src="assets/img/about-img.png" alt="" />
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div
                className="about-content"
                data-aos="fade-left"
                data-aos-delay={100}
              >
                <h2>Sobre Nosotros</h2>
                <h3>
                  Optimizando la Gestión Académica para un Futuro Educativo
                  Innovador
                </h3>
                <p>
                  En nuestra plataforma, nos dedicamos a revolucionar la
                  experiencia educativa a través de una gestión académica
                  eficiente y adaptable. Nuestra misión es proporcionar
                  herramientas intuitivas que simplifiquen los procesos
                  administrativos y promuevan un entorno de aprendizaje óptimo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End About Section */}
      <section id="contact" className="section-bg pt-lg-5" data-aos="fade-down">
        <div>
          <div className="container w-100">
            <div className="row">
              <div className="col-lg-5 my-5">
                <div className="col-sm-5 my-5 mx-5">
                  <div>
                    <h4>Contactanos</h4>
                    <p>
                      Cra 82a # 2-77 <br />
                      Cali, Valle
                      <br />
                      Colombia <br />
                      <strong>Telefono:</strong> +57 311 749 51 50
                      <br />
                      <strong>Correo:</strong> luisgarogu@gmail.com
                      <br />
                    </p>
                  </div>
                  <div className="social-links">
                    <a
                      href="https://www.facebook.com/profile.php?id=61559059859802"
                      className="facebook"
                    >
                      <i className="bi bi-facebook" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="form my-5">
                  <h4>Envianos un mensaje</h4>
                  <form
                    action="forms/contact.php"
                    method="post"
                    role="form"
                    className="php-email-form"
                  >
                    <div className="form-group">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Nombre"
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Correo"
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <textarea
                        className="form-control"
                        name="message"
                        rows={5}
                        placeholder="Mensaje"
                        required
                        defaultValue={""}
                      />
                    </div>
                    <div className="text-center my-5">
                      <button type="submit" title="Send Message">
                        Enviar Mensaje
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End  Contacto */}
      <footer id="login" className="login">
        <div className="container" data-aos="fade-up">
          <div className="footer-top">
            <div className="row justify-content-center">
              <div className="col-lg-7">
                <div
                  className="login-img"
                  data-aos="fade-right"
                  data-aos-delay={100}
                >
                  <img
                    src="assets/img/login-img.png"
                    style={{ maxWidth: "100%" }}
                    alt=""
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form">
                  <h2 className="text-center mb-4">Iniciar Sesión</h2>
                  <form
                    action="forms/contact.php"
                    method="post"
                    className="php-email-form"
                  >
                    <div className="mb-3">
                      <input
                        onChange={(e) => setUserLogin(e.target.value)}
                        type="text"
                        name="usuario"
                        className="form-control"
                        id="usuario"
                        placeholder="Usuario"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        onChange={(e) => setPasswordLogin(e.target.value)}
                        type="password"
                        className="form-control"
                        name="contrasena"
                        id="contrasena"
                        placeholder="Contraseña"
                        required
                      />
                    </div>
                    <div className="text-center mb-4">
                      <button onClick={(e)=>{handleLogin2(e)}} className="btn btn-primary btn-block">
                        Ingresar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* End Login */}
      <a
        href="#"
        className="back-to-top d-flex align-items-center justify-content-center"
      >
        <i className="bi bi-arrow-up-short" />
      </a>
    </div>
  );
}

export default Home1;
