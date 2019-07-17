import React from 'react';

function Footer() {
  return <footer className='app-footer'>
    <img src={process.env.PUBLIC_URL + '/img/logo-dossier.png'} alt=""/>
  </footer>;
}

export default Footer;