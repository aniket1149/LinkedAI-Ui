

import React from 'react';

const Experience = ({ experience }) => {
    if (!Array.isArray(experience) || experience.length === 0) return null;
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Experience</h3>
        {experience.filter(job => job).map((job, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-md font-semibold">{job.role} at {job.company}</h4>
            <p className="text-sm text-gray-600">{job.location} | {job.dates}</p>
            {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 && (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {job.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default Experience;
  