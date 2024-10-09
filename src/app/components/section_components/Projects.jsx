
import React from 'react';

const Projects = ({ projects }) => {
    if (!Array.isArray(projects) || projects.length === 0) return null;
  
    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2">Projects</h3>
        {projects.filter(project => project).map((project, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-md font-semibold">{project.projectName}</h4>
            <p className="text-sm text-gray-700">{project.description}</p>
            {Array.isArray(project.responsibilities) && project.responsibilities.length > 0 && (
              <ul className="list-disc list-inside mt-2 text-gray-700">
                {project.responsibilities.map((resp, idx) => (
                  <li key={idx}>{resp}</li>
                ))}
              </ul>
            )}
            {Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <div className="mt-2">
                <strong>Technologies:</strong> {project.technologies.join(', ')}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  export default Projects;
  