import React from 'react';
import '../Admin/styles/Modal_informacion.scss';

const Modal_informacion = ({ isOpen, onClose, userData }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-title">INFORMACIÓN DEL USUARIO</h2>
        <div className="user-info">
          <div className="info-row">
            <div className="info-column">
              <h3>Nombre</h3>
              <p>{userData.name.split(' ').slice(0, -1).join(' ')}</p>
            </div>
            <div className="info-column">
              <h3>Apellido</h3>
              <p>{userData.name.split(' ').slice(-1)[0]}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info-column full-width">
              <h3 className='correo'>Correo</h3>
              <p>{userData.correo}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info-column">
              <h3 className='rol'>Rol</h3>
              <p>{userData.role}</p>
            </div>
            <div className="info-column">
              <h3 className='codigo'>Codigo</h3>
              <p >{userData.codigo}</p>
            </div>
          </div>
          <div className="info-row">
            <div className="info-column">
              <h3>Carrera</h3>
              <p>{userData.carrera}</p>
            </div>
            <div className="info-column">
              <h3 className='asig'>Asignatura</h3>
              <p>{userData.asignatura}</p>
            </div>
          </div>
        </div>
        <button className="close-button" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal_informacion;