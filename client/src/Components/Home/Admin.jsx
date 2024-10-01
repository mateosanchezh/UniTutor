import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FaSearch, FaPencilAlt, FaTrash, FaInfoCircle, FaHome } from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { LuSettings2 } from "react-icons/lu";
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { IoMdArrowDropright } from "react-icons/io";
import Group from '../../img/Group.png';
import UnitutorLogo from '../../img/UnitutorLogo.svg';


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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/usuarios'); // Cambia el puerto si es necesario
                const usuarios = await response.json();
                setData(usuarios);
            } catch (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='admin-page'>
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

            <main className="container">
                <div className="user-list">
                    {data.map((item, index) => (
                        <div className="user-row" key={index}>
                            <TextField
                                disabled
                                label="NOMBRE Y APELLIDO"
                                defaultValue={item.nombre}
                                variant="outlined"
                                fullWidth
                            />
                            <TextField
                                disabled
                                label="ROL"
                                defaultValue={item.userRole} // Asegúrate de que este campo sea correcto
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

            <div className="sidebar">
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
                <a href="#" className="sidebar-link">
                    <FaHome className="sidebar-icon" /> Página principal
                </a>
                <a href="#" className="sidebar-link">
                    <IoMdArrowDropright className="sidebar-icon" /> Eliminados
                </a>
                <a href="#" className="sidebar-link">
                    <IoMdArrowDropright className="sidebar-icon" /> Agregados
                </a>
            </div>

            <footer>
                <div className="footer-content">
                    <p>© 2024 - UniTutor. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default Admin;
