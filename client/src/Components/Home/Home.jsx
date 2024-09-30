import React, { useState } from 'react';
import Navbar from "./Navbar";
import LoginForm from './LoginForm';
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
      timer = setTimeout(() => {
        setShowDownArrow(true);
      }, 500);
    } else {
      setShowDownArrow(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleClick = () => asignaturasRef.current?.scrollIntoView({ behavior: 'smooth' });
  const handleClick2 = () => profesoresRef.current?.scrollIntoView({ behavior: 'smooth' });

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
                  De lo presencial <br />
                  <span className="fuente">a lo virtual</span>,<br />
                  simplificando<br/>
                  <span className="fuente">el aprendizaje</span>.<br />
                </h1>
                <button
                  className={`explore-button ${isHovered ? 'hovered' : ''}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleClick}
                >
                  <span className="button-text">Explorar</span>
                  <div className="icon-wrapper">
                    <FaArrowRight className={`icon right-arrow ${isHovered && !showDownArrow ? 'show' : ''}`} />
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
              <p className='texto'>Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit, sed do eiusmod tempor incididunt ut labore et<br /> dolore magna aliqua.</p>

              <button
                className={`explorar-button ${isHovered ? 'hovered' : ''}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick2}
              >
                <span className="button-text">Explorar</span>
                <div className="icon-wrapper">
                  <FaArrowRight className={`icon right-arrow2 ${isHovered && !showDownArrow ? 'show' : ''}`} />
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
                    <div className="subject-info">
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
                <p>Educadores expertos con pasión por la enseñanza y el aprendizaje.</p>
              </div>
              <div className="cuadro">
                <h5>Apoyo constante</h5>
                <p>Asesoría y soporte continuo durante tu proceso de aprendizaje.</p>
              </div>
            </div>
          </div>
        </section>

        <footer>
          <div className="footer-content">
            <p>Hecho con <span role="img" aria-label="heart">❤️</span> por Unitutor</p>
            <div className="social-media-icons">
              <a href="https://github.com/"><FaGithub /></a>
              <a href="https://www.facebook.com/"><FaFacebookF /></a>
              <a href="https://www.youtube.com/"><FaYoutube /></a>
              <a href="https://www.instagram.com/"><FaInstagram /></a>
              <a href="https://www.linkedin.com/"><FaLinkedinIn /></a>
              <a href="https://twitter.com/"><FaXTwitter /></a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default Home;
