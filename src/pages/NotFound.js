import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from './img/pusheen the cat.png';

const NotFound = () => {
  return (
    <div className="title-page">
      <img src={notFoundImage} alt="Not Found" />
      <h1>404 - Not Found</h1>
      <h3>The page you are looking for does not exist</h3>
      <Link to="/">
        <button className="go-home-button">Go to Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
