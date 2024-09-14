import React, { useState } from 'react';
import Navbar from "./Navbar";
import { useRef } from 'react';
import "../../App.css";
import Group from '../../img/Group.png'
import Foto1 from '../../img/Foto1.png'
import Foto2 from '../../img/Foto2.png'
import Foto3 from '../../img/Foto3.png'
import { FaArrowDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";





const Home = () => {

  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const asignaturasRef = useRef(null);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
    asignaturasRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const subjects = [
    { name: 'Desarrollo de software', image: Foto1 },
    { name: 'Desarrollo de software', image: Foto1 },
    { name: 'Desarrollo de software', image: Foto1 },
    { name: 'Matemáticas discretas', image: Foto2 },
    { name: 'Matemáticas discretas', image: Foto2 },
    { name: 'Matemáticas discretas', image: Foto2 },
    { name: 'Análisis de datos', image:  Foto3},
    { name: 'Análisis de datos', image:  Foto3},
    { name: 'Análisis de datos', image:  Foto3},
  ];

    return (
      <div className="Homepage flex">
        <main>
          <section className="Unitutor">
            <Navbar />
          <div className="Home">
          <div className="content-wrapper">
            <img src={Group} alt="Logo Unitutor" className="UnitutorLogo" />
            <h2 className="uni">UNITUTOR</h2>
              <div className="vertical-line"></div>
              <div className="text-button-wrapper">
                <h1>
                  De lo presencial a <br /> lo virtual,<br /> simplificando el aprendizaje.
                </h1>
                <button 
                    type="button" 
                    className={`explore-button ${isClicked ? 'clicked' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                  >
                    Explorar 
                    {isClicked ? <FaArrowDown className='flecha_abajo' /> : (isHovered ? <FaArrowRight className='flecha_derecha'/> : null)}
                </button>
              </div>
          </div>
        </div>
          </section>


        <section className="asignaturas" ref={asignaturasRef}>
        <div className="container">
          <div className="left-section">
              <h1>¿POR QUE USAR <br />UNITUTOR?</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <button className="explorar-button">Explorar</button>
        </div>
      <div className="right-section">
        <h2>ASIGNATURAS POPULARES</h2>
        <div className="popular-subjects">
          {/* Utilizamos el método map para iterar sobre el array de materias */}
          {subjects.map((subject, index) => (
            // Para cada materia, creamos un div que actúa como una tarjeta
            // La prop 'key' es necesaria para que React pueda identificar cada elemento de la lista de forma única
              <div key={index} className="subject-card">
              {/* Mostramos la imagen de la materia */}
              <img src={subject.image} alt={subject.name} />
              {/* Mostramos el nombre de la materia */}
              <p>{subject.name}</p>
          </div>
        ))}
      </div>
      </div>  
    </div>
    </section>
        <section className="PROFESORES">
  <div className="profesores">
    <h1>PROFESORES MEJOR CALIFICADOS</h1>
    <div className="profesores-contenido">
      <div className="prof">
        <div className="imagen prof1"></div>
        <h4>Roberto Rudas</h4>
        <p>Prof. Innovación y emprendimiento</p>
      </div>
      <div className="prof">
        <div className="imagen prof2"></div>
        <h4>Roberto Rudas</h4>
        <p>Prof. Innovación y emprendimiento</p>
      </div>
      <div className="prof">
        <div className="imagen prof3"></div>
        <h4>Danilo Vargas</h4>
        <p>Prof. Desarrollo de software II</p>
      </div>
      <div className="prof">
        <div className="imagen prof4"></div>
        <h4>Jader Melendez</h4>
        <p>Prof. Matemática discreta</p>
      </div>
    </div>

    <div className="profesores2">
      <h1>¿Por que escoger nuestros profesores?</h1>
      <article>
        Un buen tutor no solo enseña, sino que inspira. Nuestros profesores están comprometidos con la excelencia académica y utilizan métodos innovadores para asegurar que no solo aprendas, sino que también apliques ese conocimiento de manera efectiva.
      </article>
    </div>

    <div className="cuadros-contenedor">
      <div className="cuadro">
        <h5>Sesiones personalizadas</h5>
        <p>Lecciones personalizadas para adaptarse a tu estilo de aprendizaje.</p>
      </div>
      <div className="cuadro">
        <h5>Tutores Calificados</h5>
        <p>Educadores expertos con pasión por la enseñanza.</p>
      </div>
      <div className="cuadro">
        <h5>Resultados Comprobados</h5>
        <p>Mejora garantizada en tus calificaciones y comprensión de las materias con nuestros métodos eficaces.</p>
      </div>
      <div className="cuadro">
        <h5>Soporte Integral</h5>
        <p>Asistencia continua para resolver dudas y guiarte en cada paso de tu proceso de aprendizaje.</p>
      </div>
    </div>
  </div>
</section>


        <section className="piedepagina">
          <div className="foot">
            <a href="#">Sobre nosotros</a>
            <a href="#">Contactanos</a>
            <a href="#">FAQ'S</a>
            <a href="#">Terminos de servicio</a>
            <a href="#">Politica de privacidad</a>
          </div>
        </section>
        <footer>
        <div className="imgfooter"></div>
          <p>Unitutor 2024</p>
          <div className="footer-vertical-line"></div> {/* Aquí agregas la línea vertical */}
          <div className='iconos-footer'>
          <FaXTwitter />
          <FaFacebookF />
          <FaLinkedinIn />
          <FaGithub />
          <FaInstagram />
          <FaYoutube />
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;  
