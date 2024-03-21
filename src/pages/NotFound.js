import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../pusheen the cat.png'; // Import your image file

const NotFound = () => {
  return (
    <div className="title-page">
      <img src={notFoundImage} alt="Not Found" /> {/* Image next to h1 title */}
      <h1>404 - Not Found</h1>
      <h3>The page you are looking for does not exist</h3>
      {/* Button to go back to the home page */}
      <Link to="/">
        <button className="go-home-button">Go to Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
