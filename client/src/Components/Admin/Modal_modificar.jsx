import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../Admin/styles/Modal_modificar.scss';  // Asegúrate de importar el archivo SCSS

const Modal_modificar = ({ isOpen, onClose, onSave }) => {
  const [nombre, setNombre] = useState('MERCEDES MARIA');
  const [apellido, setApellido] = useState('LÓPEZ GONZÁLEZ');
  const [rol, setRol] = useState('ESTUDIANTE');
  const [id, setId] = useState('51004930');
  const [correo, setCorreo] = useState('MERCEDESBENZ@GMAIL.COM');
  const [carrera, setCarrera] = useState('ING. LAVAR PLATOS');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ nombre, apellido, rol, id, correo, carrera });
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box className="modal-box">  {/* Añade una clase personalizada */}
        <div className="modal-header">
          <h2>EDITAR USUARIO</h2>
          <button className="close-btn" onClick={onClose}>
            <span>&times;</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Nombre"
                variant="outlined"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField 
                size="small"
                label="Apellido"
                variant="outlined"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl size="small">
                <InputLabel id="rol-label">Rol</InputLabel>
                <Select
                  labelId="rol-label"
                  value={rol}
                  label="Rol"
                  onChange={(e) => setRol(e.target.value)}
                >
                  <MenuItem value="ESTUDIANTE">Estudiante</MenuItem>
                  <MenuItem value="ADMINISTRADOR">Administrador</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Código"
                variant="outlined"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                label="Correo"
                variant="outlined"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl size="small">
                <InputLabel id="carrera-label">Carrera</InputLabel>
                <Select
                  labelId="carrera-label"
                  value={carrera}
                  label="Carrera"
                  onChange={(e) => setCarrera(e.target.value)}
                >
                  <MenuItem value="ING. LAVAR PLATOS">ING. LAVAR PLATOS</MenuItem>
                  <MenuItem value="MATEMATICAS">MATEMATICAS</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className='editar'
            size="small"
            style={{ marginTop: '20px' }}
          >
            EDITAR
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default Modal_modificar;
