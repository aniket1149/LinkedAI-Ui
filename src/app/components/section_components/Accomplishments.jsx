// src/app/components/Accomplishments.jsx

import React from 'react';

const Accomplishments = ({ accomplishments }) => {
  // Provide a default empty object if accomplishments is undefined or null
  const {
    awardName = "",
    issuingOrganization = "",
    dateReceived = "",
    description = ""
  } = accomplishments || {};

  // Check if at least one field is present
  if (!awardName && !issuingOrganization && !dateReceived && !description) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Accomplishments</h3>
      {awardName && <p><strong>Award:</strong> {awardName}</p>}
      {issuingOrganization && <p><strong>Organization:</strong> {issuingOrganization}</p>}
      {dateReceived && <p><strong>Date:</strong> {dateReceived}</p>}
      {description && <p className="mt-2 text-gray-700">{description}</p>}
    </div>
  );
};

export default Accomplishments;
