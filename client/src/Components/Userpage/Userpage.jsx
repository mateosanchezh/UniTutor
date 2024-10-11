import React, { useEffect, useState } from 'react';
import { CiStar, CiLocationOn, CiMail } from "react-icons/ci";
import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { FaCode } from "react-icons/fa";
import { PiGraduationCap, PiCalculatorDuotone } from "react-icons/pi";
import UnitutorLogo from '../../img/UnitutorLogo.svg';
import jwt_decode from 'jwt-decode'; // Import jwt_decode
import { Link } from 'react-router-dom';
import './Userpage.scss';

const Userpage = () => {
    const [username, setUsername] = useState('Usuario Desconocido');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwt_decode(token);
                if (decoded.sub) {
                    setUsername(decoded.sub); // Set the username from the token
                }
            } catch (error) {
                console.error("Error parsing user info from token:", error);
            }
        }
    }, []);

    return (
        <div className='userpage flex'>
            <div className="container">
                <div className="header-top">
                    <img src={UnitutorLogo} alt="Logo Unitutor" className="UnitutorLogonegro" />
                    <a href="#" className="logo">UNITUTOR</a>
                    <div className="search-bar">
                        <input type="text" placeholder="¿Qué tutoría estás buscando?" />
                    </div>
                    <div className="user-menu">{username}</div> {/* Display the username here */}
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
                        <h2>{username}</h2> {/* Update to display the username */}
                        <p>Profesor</p>
                        <p>He/him</p>
                        <a href="#" className="edit-profile">Editar perfil</a>
                        <p><CiStar className='icono' />10 Tutorías realizadas</p>
                        <p><HiOutlineBuildingOffice2 className='icono' />Tecnologico Comfenalco</p>
                        <p><CiLocationOn className='icono' />Toronto, Canada</p>
                        <p><CiMail className='icono' />{username.toLowerCase()}@gmail.com</p> {/* You might want to customize the email logic */}
                        <p><PiGraduationCap className='icono' />Tutor de Proyecto de vida</p>
                        <p><FaCode className='icono' />Tutor de Programación</p>
                        <p><PiCalculatorDuotone className='icono' />Tutor de Cálculo Integral</p>
                    </div>
                    <div className="tutoring-sessions">
                        <div className="session-search">
                            <input type="text" placeholder="Encuentra tu tutoría" />
                            <select>
                                <option>Asignatura ▼</option>
                            </select>
                            <button className='crear'><Link to="/tutorias">Crear Tutorías</Link></button>
                        </div>
                        {/* Example sessions */}
                        {[...Array(5)].map((_, index) => (
                            <div className="session" key={index}>
                                <h3>Cálculo Integral</h3>
                                <p>Martes 13, 10:00am - 12:00pm</p>
                                <span className="session-type">Presencial</span>
                                <div className="session-actions">
                                    <button>Editar</button>
                                    <button>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Userpage;
