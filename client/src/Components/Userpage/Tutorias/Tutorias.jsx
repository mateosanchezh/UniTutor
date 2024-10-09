import * as React from 'react';
import UnitutorLogo from '../../../img/UnitutorLogo.svg'
import PropTypes from 'prop-types';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { PiDesktop } from "react-icons/pi";
import { MdGroups } from "react-icons/md";
import { Link } from 'react-router-dom';
import './Tutorias.scss';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';

function MyFormControlLabel(props) {
    const radioGroup = useRadioGroup();
    let checked = false;
  
    if (radioGroup) {
      checked = radioGroup.value === props.value;
    }
  
    return <FormControlLabel checked={checked} {...props} />;
  }
  
  MyFormControlLabel.propTypes = {
    value: PropTypes.any,
  };

  

const Tutorias = () => {
    const [value, setValue] = React.useState(dayjs('2022-04-17'));

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };

  return (
    
    <div className='tutoriaspage'>
      <header>
        <div className='header-top'>
          <img src={UnitutorLogo} alt="Logo Unitutor" className='logo'/>
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
        <h2>Crear una nueva tutoria</h2>
        <p>Crea una tutoría de una de tus asignaturas con el horario de tu preferencia
        para que tus estudiantes puedan reservarla y aprender junto a ti.</p>
      </div>
      <div className='linea_horizontal'></div>
      <div className='asignatura'>
        <h3>Asignatura de la tutoria</h3>
        <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Asignaturas</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Asignatura"
            onChange={handleChange}
            >
            <MenuItem value={10}>Programacion</MenuItem>
            <MenuItem value={20}>Desarrollo De Software</MenuItem>
            <MenuItem value={30}>Analisis De Datos</MenuItem>
            </Select>
      </FormControl>
     </Box>
      </div>
      <div className='descripcion'>
        <p>Puedes escribir una descripción breve pero puntual de lo que llevaras
            a cabo en la tutoría, para que tus estudiantes estén mejor informados.</p>
        <h3>Descripcion(Opcional)</h3>
        <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '70ch' } }}
            noValidate
            autoComplete="off"
            >
           
            <TextField id="standard-basic" label="Descripción" variant="standard" />
            </Box>
      </div>
      <div className='linea_horizontal'></div>

      <div className='virtual'>
        <RadioGroup name="use-radio-group" defaultValue="first">
          <div className="radio-option">
            <MyFormControlLabel
              value="first"
              control={<Radio />}
              label={
                <div className="radio-content">
                  <PiDesktop className='icono_virtual'/>
                  <div className="text-content">
                    <h4>Virtual</h4>
                    <p>Reúnete con tus estudiantes sin importar donde te encuentres de manera rápida y puntual.</p>
                  </div>
                </div>
              }
            />
          </div>
          <div className="radio-option">
            <MyFormControlLabel
              value="second"
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
    <h5>Fecha de la tutoria</h5>
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
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  </div>
</div>
      <div className='linea_horizontal'></div>
      <button className='crear'><Link to="/tutorias">Crear Tutorias</Link></button>
      </div>
    </div>
  )
}

export default Tutorias