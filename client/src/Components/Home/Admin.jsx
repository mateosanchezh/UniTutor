import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { FaSearch, FaPencilAlt, FaTrash, FaInfoCircle } from 'react-icons/fa';
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaGithub, FaInstagram, FaYoutube,FaBars  } from 'react-icons/fa6';
import Group from '../../img/Group.png'
import UnitutorLogo from '../../img/UnitutorLogo.svg'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { FaHome } from "react-icons/fa";
import { IoMdArrowDropright } from "react-icons/io";

const Admin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);

        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const data = [
        { name: "LUIS BALCAZAR CAMPOVERDE", role: "ESTUDIANTE" },
        { name: "JUAN JOSE ORTEGA VINTIMILLA", role: "ESTUDIANTE" },
        { name: "LENIN EDUARDO SAGUAY SANAGUANO", role: "PROFESOR" },
        { name: "KARINA MASACHE ALVARADO", role: "ESTUDIANTE" },
        { name: "LILLI LUCIA ROMERO PACHECO", role: "PROFESOR" },
    ];

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <div className='admin-page'>
            <div className="header-content">
                <div className="logo">
                    <div className="logo-icon">
                        <img src={Group} alt="Logo Unitutor" className="logo-uni" />
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

            {isMobile && (
                <button className="menu-toggle" onClick={toggleSidebar}>
                    <FaBars />
                </button>
            )}

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
                                className='rol'
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

            <div className={`sidebar ${isMobile && isSidebarOpen ? 'open' : ''}`}>
                <h3>UNITUTOR <br /> X <br /> UNIVERSIDAD </h3>
                <Button
                    className='upload'
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                >
                    Subir CSV
                    <VisuallyHiddenInput
                        type="file"
                        onChange={(event) => console.log(event.target.files)}
                        multiple
                    />
                </Button>
                <a href="#" className="sidebar-link" onClick={isMobile ? toggleSidebar : undefined}>
                    <FaHome className="sidebar-icon" /> Página principal
                </a>
                <a href="#" className="sidebar-link" onClick={isMobile ? toggleSidebar : undefined}>
                    <IoMdArrowDropright className="sidebar-icon" /> Eliminados
                </a>
                <a href="#" className="sidebar-link" onClick={isMobile ? toggleSidebar : undefined}>
                    <IoMdArrowDropright className="sidebar-icon" /> Agregados
                </a>
            </div>

            <footer>
                    <div class="footer-content">
                    <div class="logo">
                        <img src={UnitutorLogo} alt="Logo Unitutor" class="Unitutornegro" /> 
                        <div class="unifooter">Unitutor 2024</div>
                    </div>
                    <div class='linea-vertical'></div>
                    <div class="social-icons">
                        <a href="#" class="social-icon"><FaXTwitter /></a>
                        <a href="#" class="social-icon"><FaFacebookF /></a>
                        <a href="#" class="social-icon"><FaLinkedinIn /></a>
                        <a href="#" class="social-icon"><FaGithub /></a>
                        <a href="#" class="social-icon"><FaInstagram /></a>
                        <a href="#" class="social-icon"><FaYoutube /></a>
                    </div>
                    </div>
        </footer>
        </div>
    );
}

export default Admin;