import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { RiHome5Fill, RiMenu3Line } from "react-icons/ri";
import { TbBook2 } from "react-icons/tb";
import { PiChats } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import "../Homeuser/homeuser.scss";
import UnitutorLogo from '../../img/UnitutorLogo.svg';
import Photouser from '../../img/NoPhoto.png';
import Photorudas from '../../img/Photo4.png';

const Homeuser = () => {
  const [username, setUsername] = useState('Usuario');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (token) {
      try {
        const decoded = jwt_decode(token);
        console.log(decoded);
        if (decoded.sub) {
          setUsername(decoded.sub);
        }
      } catch (error) {
        console.error("Error parsing user info from token:", error);
      }
    } else {
      console.warn("No token found in localStorage");
    }
  }, []);

  const tutors = [
    { name: 'Sergio', subject: 'Cálculo de varias variables', schedule: 'Martes - 31/2', time: '10:00 AM - 12:00 PM', mode: 'Virtual', tagline: 'Cálculo de varias variables' },
    { name: 'Eliecer', subject: 'Física mecánica', schedule: 'Míercoles - 32/05', time: '2:00 PM - 4:00 PM', mode: 'Presencial', tagline: 'Física mecanica' },
    { name: 'Santiago', subject: 'Competencias ciudadanas', schedule: 'Jueves - 20/12', time: '3:00 PM - 5:00 PM', mode: 'Virtual', tagline: 'Competencias ciudadanas' },
    { name: 'Cristian', subject: 'Inglés II', schedule: 'Viernes - 24/03', time: '9:00 AM - 11:00 AM', mode: 'Virtual', tagline: 'Ingles II' },
    { name: 'Mateo', subject: 'Bases de datos I', schedule: 'Viernes - 11/04', time: '4:00 PM - 6:00 PM', mode: 'Presencial', tagline: 'Bases de datos I' },
    { name: 'Goku', subject: 'Electiva libre', schedule: 'Sábado - 24/12', time: '8:00 AM - 10:00 AM', mode: 'Virtual', tagline: 'Electiva libre' }
  ];

  return (
    <div className='Homeuserpage flex'>
      <header>
        <nav className="main-nav">
          <div className="logo">
            <img src={UnitutorLogo} alt="Logo Unitutor" className="unitutor-logo" />
            <h1>UNITUTOR</h1>
          </div>
          <div className="search-bar">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input type="text" placeholder="¿Qué tutorías estás buscando?" />
            </div>
          </div>
          <div className="user-profile">
            <span>{username}</span>
            <FaUserCircle className="fauser-icon" />
          </div>
          <div className="mobile-menu-icon" onClick={toggleSidebar}>
            <RiMenu3Line />
          </div>
        </nav>
      </header>
      <main>
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <a href="#">
                <RiHome5Fill className="icon" />
                Inicio
              </a>
            </li>
            <li>
              <a href="#">
                <TbBook2 className="icon" />
                Mis Tutorías
              </a>
            </li>
            <li>
              <a href="#">
                <PiChats className="icon" />
                Chat CESSY
              </a>
            </li>
            <li>
              <a href="#">
                <IoNotificationsOutline className="icon" />
                Notificaciones
              </a>
            </li>
          </ul>
        </aside>
        {isSidebarOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        
        <section className="main-content">
          <div className="welcome-header">
            <FaUserCircle className="fauser-icon" />
            <h2>Bienvenido de nuevo, {username}...</h2>
          </div>
          <br />
          <div className="welcome-banner">
            <div className="banner-text">
              <h2>Un aprendizaje eficiente</h2>
              <p>Resuelve tus dudas y fortalece tus habilidades. Nosotros te ayudamos a tener un desempeño mejor</p>
            </div>
            <div className="banner-image">
              <img src={Photorudas} alt="rudasphoto" className="photorudas" />
            </div>
          </div>

          <div className="categories-section">
            <h3 className='categoris-text'>Categorías</h3>
            <div className="categories-grid">
              {['Matemáticas', 'Programación', 'Inglés', 'Física y Ciencias', 'Análisis de Datos', 'Bases de Datos y Redes', 'Desarrollo Personal', 'Electivas'].map((category, index) => (
                <div className="category-card" key={index}>
                  <h4>{category}</h4>
                  <ul>
                    <li>Subcategoría 1</li>
                    <li>Subcategoría 2</li>
                    <li>Subcategoría 3</li>
                    <li>...</li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <section className="available-tutors-section">
            <h3>Tutorías Disponibles</h3>
            <div className="tutors-grid">
              {tutors.map((tutor, index) => (
                <div className="tutor-card" key={index}>
                  <img src={Photouser} alt="photocard" className="photouser" />
                  <h4>{tutor.name}</h4>
                  <p className="tutor-subject">{tutor.subject}</p>
                  <p>Horario: {tutor.schedule}</p>
                  <p>{tutor.time}</p>
                  <p>{tutor.mode}</p>
                  <hr className="tutor-divider" />
                  <p style={{ fontWeight: 'bold' }}>{tutor.tagline}</p>
                  <div className="reserve-overlay">
                    <div className="reserve-content">
                      <span className="reserve-text">Reservar ya!</span>
                      <span className="reserve-text2">Tu tutoria con nuestro profesor</span>
                    </div>
                    <div className="button-container">
                      <button className="reserve-button">Reservar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Homeuser;