// src/app/components/ReferralMessage.jsx

import React from 'react';

const ReferralMessage = ({ referralMessage }) => {
  if (!referralMessage) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Referral Message</h3>
      <pre className="bg-gray-100 p-4 rounded overflow-auto text-gray-700 whitespace-pre-wrap">
        {referralMessage}
      </pre>
    </div>
  );
};

export default ReferralMessage;
