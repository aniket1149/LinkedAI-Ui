
import React from 'react';

const Interests = ({ interests }) => {
    if (!Array.isArray(interests) || interests.length === 0) return null;
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Interests</h3>
        <ul className="list-disc list-inside text-gray-700">
          {interests.filter(interest => interest).map((interest, index) => (
            <li key={index}>{interest}</li>
          ))}
        </ul>
      </div>
    );
  };

  export default Interests;
  