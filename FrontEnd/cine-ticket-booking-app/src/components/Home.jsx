// components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h2>Home Page</h2>
      {/* Your home page content */}
      <Link to="/login">Go to Login</Link><br></br>
      <Link to="/about">Go to About</Link>
    </div>

  );
};

export default Home;