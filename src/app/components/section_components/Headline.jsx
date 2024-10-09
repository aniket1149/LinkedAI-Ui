// src/app/components/Headline.jsx

import React from 'react';

const Headline = ({ headline }) => {
  if (!headline) return null;

  return (
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-700">{headline}</h3>
    </div>
  );
};

export default Headline;
