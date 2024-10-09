
import React from 'react';


const Education = ({ education }) => {
    if (!Array.isArray(education) || education.length === 0) return null;
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Education</h3>
        {education.filter(edu => edu).map((edu, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-md font-semibold">{edu.degree} at {edu.institution}</h4>
            <p className="text-sm text-gray-600">{edu.location} | {edu.dates}</p>
            {Array.isArray(edu.honors) && edu.honors.length > 0 && (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {edu.honors.map((honor, idx) => (
                  <li key={idx}>{honor}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default Education;
  