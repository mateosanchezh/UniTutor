import React from 'react'
import { RiHome5Fill } from "react-icons/ri";
import { TbBook2 } from "react-icons/tb";
import { PiChats } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const Homeuser = () => {
  return (
    <div className='Homeuserpage flex'>
<header>
  <nav className="main-nav">
    <div className="logo">
      <h1>UNITUTOR</h1>
    </div>
    <div className="search-bar">
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="¿Qué tutorías estás buscando?" />
      </div>
    </div>
    <div className="user-profile">
      <span>Usuario</span>
    </div>
  </nav>
</header>

      <main>
      <aside className="sidebar">
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

        <section className="main-content">
          <h2>Bienvenido de nuevo, user ... </h2>
          <br />
          <div className="welcome-banner">
            <div className="banner-text">
              <h2>Un aprendizaje eficiente</h2>
              <p>Resuelve tus dudas y fortalece tus habilidades. Nosotros te ayudamos a tener un desempeño mejor</p>
            </div>  
            <div className="banner-image">
              {/* Image placeholder */}
            </div>
          </div>

          <div className="categories-section">
            <h3>Categorías</h3>
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
              {['Sergio', 'Eliecer', 'Santiago', 'Cristian', 'Mateo', 'Goku'].map((tutor, index) => (
                <div className="tutor-card" key={index}>
                  <h4>{tutor}</h4>
                  <p>Horario: Lunes y Miércoles</p>
                  <p>10:00 AM - 12:00 PM</p>
                  <p>Virtual</p>
                  <div className="reserve-overlay">
                    <span className="reserve-text">Reservar ya!</span>
                    <button className="reserve-button">Reservar</button>
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


export default Homeuser