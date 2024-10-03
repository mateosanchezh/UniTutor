import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Group from '../../img/Group.png'


const Registro = () => {
  return (
    <div className='registropage'>
      <div className='content-wrapper'>
        <div className='cuadro-registro'>
          <img src={Group} alt="Logo Unitutor" className="UnitutorLog" />
          <h1>Bienvenido</h1>
          <div className='linea-horizontal'></div>
          <p>Registra tus profesores o alumnos aquí y 
              permíteles conocer Unitutor y 
              llevar más allá su aprendizaje y tutorías</p>  
          <button className='visitar'>Visitar</button>  
          <p className='boton-visitar'>Visita la pagina principal.</p>
        </div>
        <Box
          component="form"
          sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
          noValidate
          autoComplete="off"
        >
          <div className='formulario'>
            <h2>Registro</h2>
            <div className='input-container'>
            <TextField

                className='input-field'
                label="Size"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
              />


                <TextField
                className='input-field'
                label="Size"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
              />
                <TextField
                className='input-field'
                label="Size"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
              />
                <TextField
                className='input-field'
                label="Size"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
              />
                <TextField
                className='input-field'
                label="Size"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
              />
                <TextField
                className='input-field'
                label="Size"
                id="outlined-size-small"
                defaultValue="Small"
                size="small"
              />
            </div>
            <button className='registrarse'>Registrarse</button>
          </div>
        </Box>
      </div>
    </div>
  )
}

export default Registro