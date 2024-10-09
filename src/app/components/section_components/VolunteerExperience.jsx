
import React from 'react';

const VolunteerExperience = ({ volunteerExperience }) => {
    if (!Array.isArray(volunteerExperience) || volunteerExperience.length === 0) return null;
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Volunteer Experience</h3>
        {volunteerExperience.filter(vol => vol).map((vol, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-md font-semibold">{vol.role} at {vol.organization}</h4>
            <p className="text-sm text-gray-600">{vol.location} | {vol.dates}</p>
            {Array.isArray(vol.responsibilities) && vol.responsibilities.length > 0 && (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {vol.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default VolunteerExperience;
  