// src/app/components/About.jsx

import React from 'react';

const About = ({ about }) => {
  if (!about) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">About</h3>
      <p className="text-gray-700">{about}</p>
    </div>
  );
};

export default About;
