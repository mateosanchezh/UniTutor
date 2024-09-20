import React, { useState } from 'react';
import Navbar from "./Navbar";
import { useRef } from 'react';
import { useEffect } from 'react';
import "../../App.css";
import Group from '../../img/Group.png'
import Foto1 from '../../img/Foto1.png'
import Foto2 from '../../img/Foto2.png'
import Foto3 from '../../img/Foto3.png'
import UnitutorLogo from '../../img/UnitutorLogo.svg'
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
  const [showDownArrow, setShowDownArrow] = useState(false);
  const asignaturasRef = useRef(null);
  const profesoresRef = useRef(null); 


  useEffect(() => {
    let timer;
    if (isHovered) {
      // Configura un temporizador para mostrar la flecha hacia abajo después de 500ms (0.5 segundos)
      // Puedes ajustar este valor para hacer la transición más rápida o más lenta
      timer = setTimeout(() => {
        setShowDownArrow(true);
      }, 500); // Cambiado de 1000ms a 500ms
    } else {
      setShowDownArrow(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  // Manejador para cuando el cursor entra en el botón
  const handleMouseEnter = () => setIsHovered(true);
  // Manejador para cuando el cursor sale del botón
  const handleMouseLeave = () => setIsHovered(false);

  // Manejador para el clic en el botón
  const handleClick = () => {
    asignaturasRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleClick2 = () => {
    profesoresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
const handleLoginClick = () => {
    setShowLogin(!showLogin); // Alterna la visibilidad del componente Login
  };

  const subjects = [
    { 
      name: 'Desarrollo de software', 
      image: Foto1,
      description: 'Aprende a diseñar y construir aplicaciones robustas y escalables.',
      semester: 'Asignatura de tercer semestre'
    },
    { 
      name: 'Desarrollo de software II', 
      image: Foto1,
      description: 'Profundiza en técnicas avanzadas de desarrollo y arquitectura de software.',
      semester: 'Asignatura de cuarto semestre'
    },
    { 
      name: 'Desarrollo de software III', 
      image: Foto1,
      description: 'Explora el desarrollo de aplicaciones empresariales y sistemas distribuidos.',
      semester: 'Asignatura de quinto semestre'
    },
    { 
      name: 'Matemáticas discretas', 
      image: Foto2,
      description: 'Estudia los fundamentos matemáticos esenciales para la ciencia de la computación.',
      semester: 'Asignatura de segundo semestre'
    },
    { 
      name: 'Matemáticas discretas II', 
      image: Foto2,
      description: 'Profundiza en temas avanzados de matemáticas discretas y sus aplicaciones.',
      semester: 'Asignatura de tercer semestre'
    },
    { 
      name: 'Estructuras discretas', 
      image: Foto2,
      description: 'Explora estructuras matemáticas fundamentales para algoritmos y computación.',
      semester: 'Asignatura de cuarto semestre'
    },
    { 
      name: 'Análisis de datos', 
      image: Foto3,
      description: 'Aprende técnicas fundamentales para extraer información valiosa de conjuntos de datos.',
      semester: 'Asignatura de quinto semestre'
    },
    { 
      name: 'Análisis de datos avanzado', 
      image: Foto3,
      description: 'Profundiza en métodos estadísticos y de aprendizaje automático para el análisis de datos.',
      semester: 'Asignatura de sexto semestre'
    },
    { 
      name: 'Minería de datos', 
      image: Foto3,
      description: 'Explora técnicas avanzadas para descubrir patrones y conocimientos en grandes conjuntos de datos.',
      semester: 'Asignatura de séptimo semestre'
    },
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
                De lo presencial a <br />
                <span className="fuente">lo virtual</span>,<br />
                simplificando<br/>
                <span className="fuente">el aprendizaje</span>.<br />
              </h1>
                <button
                  className={`explore-button ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick}
                >
                  <span className="button-text">
                    Explorar
                  </span>
                  <div className="icon-wrapper">
                    {/* Flecha derecha: se muestra al hacer hover y se oculta cuando aparece la flecha hacia abajo */}
                    <FaArrowRight className={`icon right-arrow ${isHovered && !showDownArrow ? 'show' : ''}`} />
                    {/* Flecha hacia abajo: se muestra después del temporizador */}
                    <FaArrowDown className={`icon down-arrow ${showDownArrow ? 'show' : ''}`} />
                  </div>
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
              
              <button
                  className={`explorar-button ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick2}
                >
                  <span className="button-text">
                    Explorar
                  </span>
                  <div className="icon-wrapper">
                    {/* Flecha derecha: se muestra al hacer hover y se oculta cuando aparece la flecha hacia abajo */}
                    <FaArrowRight className={`icon right-arrow2 ${isHovered && !showDownArrow ? 'show' : ''}`} />
                    {/* Flecha hacia abajo: se muestra después del temporizador */}
                    <FaArrowDown className={`icon down-arrow2 ${showDownArrow ? 'show' : ''}`} />
                  </div>
                </button>
                
        </div>
        <div className="right-section">
            <h2>ASIGNATURAS POPULARES</h2>
            <div className="popular-subjects">
              {/* Utilizamos map para iterar sobre el array de asignaturas */}
              {subjects.map((subject, index) => (
                // Para cada asignatura, creamos un div que actúa como una tarjeta
                <div key={index} className="subject-card">
                  {/* Mostramos la imagen de la asignatura */}
                  <img src={subject.image} alt={subject.name} />
                  {/* Mostramos el nombre de la asignatura debajo de la imagen */}
                  <p>{subject.name}</p>
                  {/* Este div contiene la información que se muestra al hacer hover */}
                  <div className="subject-info">
                    {/* Título de la asignatura */}
                    <h3>{subject.name}</h3>
                    {/* Semestre de la asignatura */}
                    <p className="semester">{subject.semester}</p>
                    {/* Descripción de la asignatura */}
                    <p className="description">{subject.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
          <img src={UnitutorLogo} alt="Logo Unitutor" className="UnitutorLogonegro" /> 
        </section>
        <section className="PROFESORES" ref={profesoresRef}>
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
                <h1>¿Por qué escoger nuestros profesores?</h1>
             <article>
                <p> Un buen tutor no solo enseña, sino que inspira. Nuestros profesores están comprometidos con la excelencia académica y utilizan métodos innovadores para asegurar que no solo aprendas, sino que también apliques ese conocimiento de manera efectiva.  </p>
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
