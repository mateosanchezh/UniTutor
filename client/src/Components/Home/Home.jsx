import React, { useState } from 'react';
import Navbar from "./Navbar";
import LoginForm from './LoginForm';
import { useRef } from 'react';
import { useEffect } from 'react';
import "./Home.scss";
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


  const [activeSubject, setActiveSubject] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showDownArrow, setShowDownArrow] = useState(false);
  const asignaturasRef = useRef(null);
  const profesoresRef = useRef(null); 


  const scrollToSection = (section) => {
    let ref;
    switch(section) {
      case 'asignaturas':
        ref = asignaturasRef;
        break;
      case 'profesores':
        ref = profesoresRef;
        break;
      default:
        return;
    }
    
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };



  

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
      description: '- AUMENTA TUS HABILIDADES DE PROGRAMACION',
      semester: 'ASIGNATURA DE SEXTO SEMESTRE'
    },
    { 
      name: 'Desarrollo de software ', 
      image: Foto1,
      description: '- AUMENTA TUS HABILIDADES DE PROGRAMACION',
      semester: 'ASIGNATURA DE SEXTO SEMESTRE'
    },
    { 
      name: 'Desarrollo de software ', 
      image: Foto1,
      description: '- AUMENTA TUS HABILIDADES DE PROGRAMACION',
      semester: 'ASIGNATURA DE SEXTO SEMESTRE'
    },
    { 
      name: 'Matematicas discretas', 
      image: Foto2,
      description: '- CONOCE NUEVAS MANERAS DE RESOLVER PROBLEMAS',
      semester: 'ASIGNATURA DE SEXTO SEMESTRE'
    },
    { 
      name: 'Matematicas discretas', 
      image: Foto2,
      description: '- CONOCE NUEVAS MANERAS DE RESOLVER PROBLEMAS',
      semester: 'ASIGNATURA DE SEXTO SEMESTRE'
    },
    { 
      name: 'Matematicas discretas', 
      image: Foto2,
      description: '- CONOCE NUEVAS MANERAS DE RESOLVER PROBLEMAS',
      semester: 'ASIGNATURA DE SEXTO SEMESTRE'
    },
    { 
      name: 'Analisis de datos ', 
      image: Foto3,
      description: '- APRENDE A SER UN MEJOR ANALISTA DE DATOS',
      semester: 'ASIGNATURA DE SEXTO SEMESTRE'
    },
    { 
      name: 'Analisis de datos ', 
      image: Foto3,
      description: '- APRENDE A SER UN MEJOR ANALISTA DE DATOS',
      semester: 'ASIGNATURA DE SEXTO SEMESTRE'
    },
    { 
      name: 'Analisis de datos ', 
      image: Foto3,
      description: '- APRENDE A SER UN MEJOR ANALISTA DE DATOS',
      semester: 'ASIGNATURA DE SEXTO SEMESTRE'
    },
  ];


  return (
    <div className="Homepage flex">
      <main>
        <section className="Unitutor">
        <Navbar scrollToSection={scrollToSection} />
        <LoginForm/>
          <div className="Home">
            <div className="content-wrapper">
              <img src={Group} alt="Logo Unitutor" className="UnitutorLogo" />
              <h2 className="uni">UNITUTOR</h2>
              <div className="vertical-line"></div>
              <div className="text-button-wrapper">
              <h1>
                De lo presencial <br />
                <span className="fuente">a lo virtual,</span><br />
                simplificando<br/>
                <span className="fuente">el aprendizaje.</span><br />
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
              <h1>¿POR QUE USAR <br /> <span className='titulo2'> UNITUTOR? </span></h1>
              <p className='texto'>Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed do eiusmod tempor incididunt ut labore  et<br /> dolore magna aliqua.</p>
              
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
              {subjects.map((subject, index) => (
                <div key={index} className="subject-card">
                  <img src={subject.image} alt={subject.name} />
                  <p className='subject'>{subject.name}</p>
                  <div className={`subject-info ${activeSubject === index ? 'show' : ''}`}>
                    <h3>{subject.name}</h3>
                    <p className="semester">{subject.semester}</p>
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
