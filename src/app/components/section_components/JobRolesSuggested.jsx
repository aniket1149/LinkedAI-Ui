import React from "react";
import SuggestedJobsList from "./SuggestedJobsList";

const JobRolesSuggested = ({ jobRolesSuggested }) => {
  const baseUrl = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?"

    if (!Array.isArray(jobRolesSuggested) || jobRolesSuggested.length === 0) return null;
    try{
      const jobRolePromise = jobRolesSuggested.map(async (jobRole) => {
          try{
              const newJobRoleUri = encodeURI(baseUrl+jobRole);
              console.log(newJobRoleUri + " hi");
              
          }catch(error){}
      })
  }catch(error){

  }
    return (
      <div className="mb-6">
        <div className="mt-2 overflow-y-auto">
          <SuggestedJobsList jobRolesSuggested={jobRolesSuggested} />
        </div>
        
        {/* <ul className="list-disc list-inside text-gray-700">
          {jobRolesSuggested.filter(role => role).map((role, index) => (
            <li key={index}>{role}</li>
          ))}
        </ul> */}
      </div>
    );
  };

  export default JobRolesSuggested;
  