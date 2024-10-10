import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FaSearch, FaPencilAlt, FaTrash, FaInfoCircle, FaHome } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { FaXTwitter, FaFacebookF, FaLinkedinIn, FaGithub, FaInstagram, FaYoutube, FaBars } from 'react-icons/fa6';
import { LuSettings2 } from "react-icons/lu";
import UnitutorLogo from '../../img/UnitutorLogo.svg';
import Group from '../../img/Group.png';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { IoMdArrowDropright } from "react-icons/io";
import './Admin.scss';

// Input oculto para subir CSV
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

const Admin = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const usersPerPage = 10;

    // Lógica para manejar si el dispositivo es móvil
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

    // Obtener datos de usuarios desde el backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch('http://localhost:8080/api/usuarios');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const usuarios = await response.json();
                setData(usuarios);
                setError(null);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
                setError(`Error al obtener los usuarios: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Cálculo de los índices de usuarios para paginación
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

    // Manejadores de paginación
    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / usersPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

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
                    {currentUsers.map((item, index) => (
                        <div className="user-row" key={index}>
                            <TextField
                                disabled
                                label="NOMBRE Y APELLIDO"
                                defaultValue={`${item.nombre} ${item.apellido}`}
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                disabled
                                label="ROL"
                                defaultValue={item.userRole}
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
                <button className="flecha" onClick={handlePrevPage} disabled={currentPage === 1}>
                    <MdKeyboardDoubleArrowLeft className='flechas' />
                </button>
                {[...Array(Math.ceil(data.length / usersPerPage))].map((_, index) => (
                    <button
                        key={index}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button className="flecha" onClick={handleNextPage} disabled={currentPage === Math.ceil(data.length / usersPerPage)}>
                    <MdKeyboardDoubleArrowRight className='flechas' />
                </button>
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
                <div className="footer-content">
                    <img src={UnitutorLogo} alt="Logo Unitutor" className="Unitutornegro" />
                    <div className="unifooter">Unitutor 2024</div>
                    <div className='linea-vertical'></div>
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
};

export default Admin;
