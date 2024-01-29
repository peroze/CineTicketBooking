// components/Movies.js
import React from 'react';
import { Link } from 'react-router-dom';

const Movies = () => {
  return (
    <div>
      <h2>Home Page</h2>
      {/* Your home page content */}
      <Link to="/">Go to Home Page</Link>
    </div>

  );
};

export default Movies;