
import React from 'react';

const Skills = ({ skills }) => {
    if (!Array.isArray(skills) || skills.length === 0) return null;
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Skills</h3>
        <div className="flex flex-wrap">
          {skills.filter(skill => skill).map((skill, index) => (
            <span key={index} className="bg-gray-200 text-gray-800 text-sm px-2 py-1 mr-2 mb-2 rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>
    );
  };

  export default Skills;
  