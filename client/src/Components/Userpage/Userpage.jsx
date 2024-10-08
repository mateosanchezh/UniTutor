import React from 'react'
import './Userpage.scss'
import { CiStar,CiLocationOn,CiMail } from "react-icons/ci";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { PiGraduationCap,PiCalculatorDuotone } from "react-icons/pi";

const Userpage = () => {
  return (

    <div className='userpage flex'>
                <div className="container">
                <div className="header-top">
                    <a href="#" className="logo">
                    UNITUTOR
                    </a>
                    <div className="search-bar">
                    <input type="text" placeholder="¿Qué tutoría estás buscando?" />
                    </div>
                    <div className="user-menu">Usuario Desconocido</div>
                    <div className='fondo-user'></div>
                </div>
                </div>
                <nav>
                <a href="#">Descripción</a>
                <a href="#">Horario</a>
                <a href="#">Notificaciones</a>
                <a href="#">Mensajes</a>
                </nav>
            
            <div className="container">
                <div className="main-content">
                <div className="profile">
                    <div className="profile-image" />
                    <h2>Usuario Desconocido</h2>
                    <p>Profesor</p>
                    <p>He/him</p>
                    <a href="#" className="edit-profile">
                    Editar perfil
                    </a>
                     <p> <CiStar className='icono' />10 Tutorías realizadas</p>
                    <p><HiOutlineBuildingOffice2 className='icono' />Tecnologico Comfenalco</p>
                    <p><CiLocationOn className='icono' />Toronto, Canada</p>
                    <p><CiMail className='icono'/>Usuariodesconocido@gmail.com</p>
                    <p><PiGraduationCap className='icono'/>Tutor de Proyecto de vida</p>
                    <p>Tutor de Programación</p>
                    <p><PiCalculatorDuotone className='icono'/>Tutor de Cálculo Integral</p>
                </div>
                <div className="tutoring-sessions">
                    <div className="session-search">
                    <input type="text" placeholder="Encuentra tu tutoría" />
                    <select>
                        <option>Asignatura ▼</option>
                    </select>
                    <button className='crear'>Crear Tutoria</button>
                    </div>
                    <div className="session">
                    <h3>Calculo Integral</h3>
                    <p>Martes 13, 10:00am - 12:00pm</p>
                    <span className="session-type">Presencial</span>
                    <div className="session-actions">
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </div>
                    </div>
                    <div className="session">
                    <h3>Calculo Integral</h3>
                    <p>Martes 13, 10:00am - 12:00pm</p>
                    <span className="session-type">Presencial</span>
                    <div className="session-actions">
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </div>
                    </div>
                    <div className="session">
                    <h3>Calculo Integral</h3>
                    <p>Martes 13, 10:00am - 12:00pm</p>
                    <span className="session-type">Presencial</span>
                    <div className="session-actions">
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </div>
                    </div>
                    <div className="session">
                    <h3>Calculo Integral</h3>
                    <p>Martes 13, 10:00am - 12:00pm</p>
                    <span className="session-type">Presencial</span>
                    <div className="session-actions">
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </div>
                    </div>
                    <div className="session">
                    <h3>Calculo Integral</h3>
                    <p>Martes 13, 10:00am - 12:00pm</p>
                    <span className="session-type">Presencial</span>
                    <div className="session-actions">
                        <button>Editar</button>
                        <button>Eliminar</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
    </div>


  )
}

export default Userpage