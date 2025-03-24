import React, { useEffect, useState } from 'react';

function GoogleForm() {
  const [formUrl, setFormUrl] = useState('');

  useEffect(() => {
    // Aquí deberías obtener la URL del formulario de Google Forms desde tu backend o configuración
    setFormUrl('https://docs.google.com/forms/d/e/1FAIpQLSfwci31plbkwpESPGMiT5-936AtKwptWicM_z7L68JZT9Q5UA/viewform?usp=sf_link');
  }, []);

  return (
    <div className="google-form">
      {formUrl ? (
        <iframe src={formUrl} width="100%" height="600px" frameBorder="0" marginHeight="0" marginWidth="0">Cargando…</iframe>
      ) : (
        <p>Cargando formulario...</p>
      )}
    </div>
  );
}

export default GoogleForm;
