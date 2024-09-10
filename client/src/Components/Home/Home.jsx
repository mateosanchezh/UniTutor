import React from "react";
import Navbar from "./Navbar";
import "../../App.css";

const Home = () => {
  return (
    <div className="Homepage flex">
      <main>
        <section className="Unitutor">
          <Navbar />
            <div className="Home">
              <h1>UNITUTOR</h1>
              <h2>
                De lo presencial a <br /> lo virtual,<br /> simplificando el aprendizaje.
              </h2>
              <div className="cont">
                <h3>¿Que es unitutor?</h3>
              <article>Lorem, ipsum dolor sit amet consectetur adipisicing elitd adipisci earum impedit iure. </article>
                <h4>¿Por que usar unitutor?</h4>
              <article>Lorem, ipsum dolor sit amet consectetur adipisicing elitd adipisci earum impedit iure.</article>
              </div>
            </div>
        </section>

        <section className="materias">
          <div className="aprendizaje">
            <h1>¿Dificultad para aprender?</h1>
            <article>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
              placeat est odio magni se
            </article>
          </div>
          <div className="Desarrollo">
            <article> Desarrollo de Software</article>
            <p>Aumenta tus habilidades de programación.</p>
          </div>
          <div className="analisis">
            <article>Analisis de datos</article>
            <p>Aprende a ser un mejor analista de datos.</p>
          </div>
          <div className="matematica">
            <article>Matemática discreta</article>
            <p>Conoce nuevas maneras de resolver problemas.</p>
          </div>
          <div className="ingles">
            <article>Ingles V</article>
            <p>Desarrollo un mejor nivel de ingles.</p>
          </div>

          <div className="profesores">
            <h1>Nuestros Profesores</h1>
            <div className="prof1">
              <h4>Roberto Rudas</h4>
              <p>Prof. Innovación y emprendimiento</p>
            </div>
            <div className="prof2">
              <h4>Roberto Rudas</h4>
              <p>Prof. Innovación y emprendimiento</p>
            </div>
            <div className="prof3">
              <h4>Roberto Rudas</h4>
              <p>Prof. Innovación y emprendimiento</p>
            </div>
            <div className="prof4">
              <h4>Jader Melendez</h4>
              <p>Prof. Matemática discreta</p>
            </div>
              <div className="profesores2">
                <h1>¿Porque escoger nuestros profesores?</h1>
                <article>
                  Un buen tutor no solo enseña, sino que inspira. Nuestros
                  profesores están comprometidos con la excelencia académica y
                  utilizan métodos innovadores para asegurar que no solo aprendas,
                  sino que también apliques ese conocimiento de manera efectiva.
                </article>
              </div>
              <div className="cuadro">
                <h5>Sesiones personalizadas</h5>
                <p>Lecciones personalizadas para adaptarse a tu estilo de aprendizaje.</p>
              </div>
              <div className="cuadro2">
                <h5>Tutores Calificados</h5>
                <p>Educadores expertos con pasión por la enseñanza.</p>
              </div>
              <div className="cuadro3">
                <h5>Horarios Flexibles</h5>
                <p>Aprende a tu propio ritmo, en el horario que más te convenga.</p>
              </div>
              <div className="cuadro4">
                <h5>Resultados Comprobados</h5>
                <p>Mejora garantizada en tus calificaciones y comprensión de las materias con nuestros métodos eficaces.</p>
              </div>
              <div className="cuadro5">
                <h5>Soporte Integral</h5>
                <p>Asistencia continua para resolver dudas y guiarte en cada paso de tu proceso de aprendizaje.</p>
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
          <p>Unitutor 2024</p>
        </footer>
      </main>
    </div>
  );
};

export default Home;
