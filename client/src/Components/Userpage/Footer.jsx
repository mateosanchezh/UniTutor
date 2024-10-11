import React from 'react';
import './Footer.scss';
import Group from '../../img/Group.png';


const Footer = () => {
  return (
    <div className='footer'>
      <div className='lista'>
      <ul>
          <li>Información</li>
          <li><a href="#">Información 1</a></li>
          <li><a href="#">Información 2</a></li>
          <li><a href="#">Información 3</a></li>
        </ul>
        <ul>
          <li>Contáctanos</li>
          <li><a href="#">Contacto 1</a></li>
          <li><a href="#">Contacto 2</a></li>
          <li><a href="#">Contacto 3</a></li>
        </ul>
        <ul>
          <li>Developers</li>
          <li><a href="#">Developer 1</a></li>
          <li><a href="#">Developer 2</a></li>
          <li><a href="#">Developer 3</a></li>
        </ul>
        <ul>
          <li>Universidad</li>
          <li><a href="#">Universidad 1</a></li>
          <li><a href="#">Universidad 2</a></li>
          <li><a href="#">Universidad 3</a></li>
        </ul>
      </div>
      <img src={Group} alt="Logo" className="footer-logo" />
    </div>
  );
}

export default Footer;
