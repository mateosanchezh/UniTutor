import React from 'react'
import TextField from '@mui/material/TextField';
import { FaSearch, FaPencilAlt, FaTrash, FaInfoCircle, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa6';
import Group from '../../img/Group.png'
import UnitutorLogo from '../../img/UnitutorLogo.svg'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";



const Admin = () => {
    const data = [
        { name: "LUIS BALCAZAR CAMPOVERDE", role: "ESTUDIANTE" },
        { name: "JUAN JOSE ORTEGA VINTIMILLA", role: "ESTUDIANTE" },
        { name: "LENIN EDUARDO SAGUAY SANAGUANO", role: "PROFESOR" },
        { name: "KARINA MASACHE ALVARADO", role: "ESTUDIANTE" },
        { name: "LILLI LUCIA ROMERO PACHECO", role: "PROFESOR" },
    ];

    return (
        <div className='admin-page'>
            <header>
                <div className="header-content">
                    <div className="logo">
                        <div className="logo-icon">
                        <img src={Group} alt="Logo Unitutor" className="logo" />
                        </div>
                        <div className="logo-text">DATOS UNITUTOR</div>
                    </div>
                    <div className="search-bar">
                    <TextField 
                    className='buscar'
                            variant="outlined" 
                            InputProps={{
                                startAdornment: <FaSearch className="search-icon" />,
                                endAdornment: <LuSettings2 className="settings-icon" />,
                            }}
                        />
                    </div>
                </div>
            </header>

            <main className="container">
                <div className="user-list">
                    {data.map((item, index) => (
                        <div className="user-row" key={index}>
                            <TextField
                                disabled
                                label="NOMBRE Y APELLIDO"
                                defaultValue={item.name}
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                disabled
                                label="ROL"
                                defaultValue={item.role}
                                variant="outlined"
                                fullWidth
                            />
                            <div className="action-buttons">
                                <button className="action-button" title="Modificar"><FaPencilAlt /></button>
                                <button className="action-button" title="Eliminar"><FaTrash /></button>
                                <button className="action-button" title="Información"><FaInfoCircle /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <div className="pagination">
                    <button className="flecha"><MdKeyboardDoubleArrowLeft className='flechas' /></button>
                    <button className="page-button">1</button>
                    <button className="page-button active">2</button>
                    <button className="page-button">3</button>
                    <button className="flecha"><MdKeyboardDoubleArrowRight className='flechas' /></button>
                </div>

            <footer>
            
                <div className="footer-content">
                    <div className="logo">
                    <img src={UnitutorLogo} alt="Logo Unitutor" className="Unitutornegro" /> 
                        <div className="logo-text">Unitutor 2024</div>
                    </div>
                    <div className="social-icons">
                        <a href="#" className="social-icon"><FaXTwitter /></a>
                        <a href="#" className="social-icon"><FaFacebookF /></a>
                        <a href="#" className="social-icon"><FaLinkedinIn /></a>
                        <a href="#" className="social-icon"><FaGithub /></a>
                        <a href="#" className="social-icon"><FaInstagram /></a>
                        <a href="#" className="social-icon"><FaYoutube /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Admin;