import React from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from "jwt-decode";

function Profile() {
    const token =localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
  return (
    <>
      <h1>Profielpagina</h1>
      <section>
        <h2>Gegevens</h2>
        <p><strong>Gebruikersnaam:</strong> {decodedToken.username}</p>
        <p><strong>Email:</strong> {decodedToken.email}</p>
      </section>
      <section>
        <h2>Strikt geheime profiel-content</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias cum debitis dolor dolore fuga id molestias qui quo unde?</p>
      </section>
      <p>Terug naar de <Link to="/">Homepagina</Link></p>
    </>
  );
}

export default Profile;