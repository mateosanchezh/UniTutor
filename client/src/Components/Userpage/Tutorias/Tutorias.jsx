import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UnitutorLogo from '../../../img/UnitutorLogo.svg';
import PropTypes from 'prop-types';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { PiDesktop } from "react-icons/pi";
import { MdGroups } from "react-icons/md";
import './Tutorias.scss';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Footer from '../Footer';

const MyFormControlLabel = (props) => {
    const radioGroup = useRadioGroup();
    const checked = radioGroup ? radioGroup.value === props.value : false;

    return <FormControlLabel checked={checked} {...props} />;
};

MyFormControlLabel.propTypes = {
    value: PropTypes.any,
};

const Tutorias = () => {
    const [formData, setFormData] = useState({
        idMateria: '',
        fecha: '',
        hora: '',
        modalidad: 'VIRTUAL',
        descripcion: '',
    });
    const [materias, setMaterias] = useState([]);
    const [value, setValue] = useState(dayjs());
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchMaterias = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No se encontró el token de autenticación.');
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/tutorias/materias', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setMaterias(response.data);
            } catch (error) {
                console.error('Error al obtener las materias:', error);
            }
        };

        fetchMaterias();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('No se encontró el token de autenticación.');
            return;
        }

        if (!formData.idMateria || !formData.hora) {
            setMessage('Por favor completa todos los campos obligatorios.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/tutorias/crear', {
                ...formData,
                fecha: value.format('YYYY-MM-DD'),
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setMessage('Tutoría creada con éxito!');
            setFormData({ idMateria: '', fecha: '', hora: '', modalidad: 'VIRTUAL', descripcion: '' });
            setValue(dayjs());
        } catch (error) {
            setMessage('Error al crear la tutoría: ' + error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className='tutoriaspage'>
            <header>
                <div className='header-top'>
                    <img src={UnitutorLogo} alt="Logo Unitutor" className='logo' />
                    <h1>Unitutor</h1>
                    <div className="search-bar">
                        <input type="text" placeholder="¿Qué tutoría estás buscando?" />
                    </div>
                    <div className="user-menu">Usuario Desconocido</div>
                    <div className='fondo-user'></div>
                </div>
            </header>

            <div className='container'>
                <div className='crear-tutoria'>
                    <h2>Crear una nueva tutoría</h2>
                    <p>Crea una tutoría de una de tus asignaturas con el horario de tu preferencia para que tus estudiantes puedan reservarla y aprender junto a ti.</p>
                </div>
                <div className='linea_horizontal'></div>
                <div className='asignatura'>
                    <h3>Asignatura de la tutoría</h3>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Asignaturas</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={formData.idMateria}
                                label="Asignatura"
                                onChange={(e) => {
                                    setFormData({ ...formData, idMateria: e.target.value });
                                }}
                                className="custom-select"
                                MenuProps={{
                                    PaperProps: {
                                        style: {
                                            maxHeight: 200,
                                        },
                                    },
                                    disableScrollLock: true,
                                }}
                            >
                                <MenuItem value="">Selecciona una materia</MenuItem>
                                {materias.map(materia => (
                                    <MenuItem key={materia.id} value={materia.id}>{materia.nombre}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>

                <div className='descripcion'>
                    <p>Puedes escribir una descripción breve pero puntual de lo que llevarás a cabo en la tutoría, para que tus estudiantes estén mejor informados.</p>
                    <h3>Descripción (Opcional)</h3>
                    <Box component="form" noValidate autoComplete="off">
                        <TextField
                            label="Descripción"
                            id="outlined-size-small"
                            size="small"
                            value={formData.descripcion}
                            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                            className="custom-textfield"
                        />
                    </Box>
                </div>
                <div className='linea_horizontal'></div>

                <div className='virtual'>
                    <RadioGroup name="modalidad" value={formData.modalidad} onChange={handleChange}>
                        <div className="radio-option">
                            <MyFormControlLabel
                                value="VIRTUAL"
                                control={<Radio />}
                                label={
                                    <div className="radio-content">
                                        <PiDesktop className='icono_virtual' />
                                        <div className="text-content">
                                            <h4>Virtual</h4>
                                            <p>Reúnete con tus estudiantes sin importar dónde te encuentres de manera rápida y puntual.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                        <div className="radio-option">
                            <MyFormControlLabel
                                value="PRESENCIAL"
                                control={<Radio />}
                                label={
                                    <div className="radio-content">
                                        <MdGroups className='icono_presencial' />
                                        <div className="text-content">
                                            <h4>Presencial</h4>
                                            <p>Reúnete con tus estudiantes en la universidad para una mejor cercanía con ellos.</p>
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </RadioGroup>
                </div>
                <div className='linea_horizontal'></div>
                <div className='fecha-hora-container'>
                    <div className='fecha'>
                        <p>Selecciona el mes, día y hora en la que deseas realizar tu tutoría.</p>
                        <h5>Fecha de la tutoría</h5>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DateCalendar']}>
                                <DemoItem>
                                    <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
                                </DemoItem>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>

                    <div className='hora'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <TimePicker
                                    label="Hora de la tutoría"
                                    onChange={(newValue) => setFormData({ ...formData, hora: newValue.format('HH:mm') })}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <div className='linea_horizontal'></div>
                <button className='crear' onClick={handleSubmit}>Crear Tutoría</button>

                {message && <div className="message">{message}</div>}
            </div>

            <Footer />
        </div>
    );
};

export default Tutorias;
