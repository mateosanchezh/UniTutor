import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Group from '../../img/Group.png'


const Registro = () => {
  return (
    <div className='registropage flex'>
        <div className='cuadro-registro'>
        <img src={Group} alt="Logo Unitutor" className="UnitutorLog" />
            <h1> Bienvenido </h1>
        <div className='linea-horizontal'></div>
        <p>Registra tus profesores o alumnos aquí y 
            permíteles conocer Unitutor y 
            llevar más allá su aprendizaje y tutorías</p>  
            <button>Visitar</button>  
            <p className='boton visitar'>Visita la pagina principal.</p>
        </div>
        <Box
      component="form"
      sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
    <div className='Formulario'>
        <h2>Registro</h2>
      <div className='input'>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="Hello World"
        />

        <button>Registrarse</button>
        
        
        </div>
    </div>
    </Box>

    </div>
  )
}

export default Registro