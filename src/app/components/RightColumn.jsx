// src/app/components/RightColumn.jsx

import React from 'react';
import JobRolesSuggested from './section_components/JobRolesSuggested';
import ReferralMessage from './section_components/ReferralMessage';

const RightColumn = ({ resumeData }) => {
  if (!resumeData) {
    return (
      <div className="bg-white text-black p-6 shadow h-full flex items-center justify-center">
        <h1 className="text-xl font-bold mb-4 text-black">Wait for the magic to take place </h1>
      </div>
    );
  }

  const {
    jobRolesSuggested,
    referralMessage
  } = resumeData;

  return (
    <div className="h-full flex flex-col">
      {/* Right Top Section */}
      <div className="flex-[2] bg-white text-black p-6 border-b border-gray-300 flex flex-col">
        {/* Content for Right Top */}
        <div className="mb-2 ">
        <h2 className="text-xl font-semibold mb-2 ">Top 2 Matched Job Roles</h2>
        <h3 className="text-lg font-semibold mb-2 ">Jobs for you</h3>
        </div>
        <JobRolesSuggested jobRolesSuggested={jobRolesSuggested} />
      </div>

      {/* Right Bottom Section */}
      <div className="flex-[1] bg-white text-black p-6 border-b border-gray-300">
        {/* Content for Right Bottom */}
        <h2 className="text-xl font-semibold mb-2">Referral Message to Connect with right people</h2>
        <ReferralMessage referralMessage={referralMessage} />
      </div>
    </div>
  );
};

export default RightColumn;
