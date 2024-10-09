// 'use client'; // Ensure this is a Client Component

// import React, { useEffect, useState } from 'react';
// import axios from 'axios'; // HTTP client for making API calls
// import { ClipLoader } from 'react-spinners'; 

// const SuggestedJobsList = ({ jobRolesSuggested }) => {
//     const [jobs, setJobs] = useState([]); // Holds all fetched jobs
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const baseUrl = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?"

//     useEffect(() => {
//         const fetchJobsForRoles = async () => {
//             if (!jobRolesSuggested || jobRolesSuggested.length === 0) {
//               setError('No job roles suggested.');
//               return;
//             }
      
//             setLoading(true);
//             setError(null);

//             try{
//                 const jobRolePromise = jobRolesSuggested.map(async (jobRole) => {
//                     try{
//                             const response = await axios.get('/api/jobs/suggested',{
//                             params: { keywords: jobRole },
//                             responseType: 'text', // Important: Expecting HTML as text
//                         });
//                         if (response.status === 200 && typeof response.data === 'string') {
//                             const parser = new DOMParser();
//                             const doc = parser.parseFromString(response.data, 'text/html');
                  
//                             const jobElements = doc.querySelectorAll('li'); // Select all <li> elements
                  
//                             const extractedJobs = Array.from(jobElements).map((li) => {
//                               // Extract the job title
//                               const titleElement = li.querySelector('.base-search-card__title');
//                               const jobTitle = titleElement ? titleElement.textContent.trim() : 'No Title';
                  
//                               // Extract the company name
//                               const companyElement = li.querySelector('.base-search-card__subtitle a');
//                               const companyName = companyElement ? companyElement.textContent.trim() : 'No Company';
                  
//                               // Extract the location
//                               const locationElement = li.querySelector('.job-search-card__location');
//                               const location = locationElement ? locationElement.textContent.trim() : 'No Location';
                  
//                               // Extract the apply link
//                               const applyLinkElement = li.querySelector('.base-card__full-link');
//                               const applyLink = applyLinkElement ? applyLinkElement.getAttribute('href') : '#';
                  
//                               return {
//                                 jobTitle,
//                                 companyName,
//                                 location,
//                                 applyLink,
//                               };
//                             });
                  
//                             setJobs(extractedJobs);
//                           }
//                             else{
//                                 setError('Failed to fetch job suggestions.');
//                             }
//                     }catch(error){
//                         console.error('Error fetching jobs from :', error);
//                         setError('An error occurred while fetching job suggestions from upstream.');
//                     }
//                 })
//             }catch(error){
//                 console.error('Error fetching jobs from :', err);
//                 setError('Suggested Roles parsing error');
//             }
//             finally {
//                 setLoading(false);
//               }
//         };
//         fetchJobsForRoles();
//     },[jobRolesSuggested]);


//     if (loading) {
//         return (
//           <div className="bg-white text-black p-4 rounded shadow mb-4 flex items-center justify-center">
//             <ClipLoader color="#000000" loading={loading} size={30} />
//           </div>
//         );
//       }
    
//       if (error) {
//         return (
//           <div className="bg-white text-black p-4 rounded shadow mb-4">
//             <h3 className="text-lg font-semibold mb-2">Suggested Jobs</h3>
//             <p className="text-red-500">{error}</p>
//           </div>
//         );
//       }

//       if (jobs.length === 0) {
//         return (
//           <div className="bg-white text-black p-4 rounded shadow mb-4">
//             <h3 className="text-lg font-semibold mb-2">Suggested Jobs</h3>
//             <p className="text-gray-500">No job suggestions available at the moment.</p>
//           </div>
//         );
//       }

//       return (
//         <div className="bg-white text-black p-4 rounded shadow mb-4 overflow-auto max-h-96">
//           <h3 className="text-lg font-semibold mb-4">Suggested Jobs</h3>
//           <div className="grid gap-4">
//             {jobs.map((job, index) => (
//               <div key={index} className="flex justify-between items-center border p-4 rounded hover:shadow-lg transition-shadow">
//                 {/* Left Side: Job Details */}
//                 <div>
//                   <h4 className="text-md font-medium">{job.jobTitle}</h4>
//                   <p className="text-gray-700">{job.companyName}</p>
//                   <p className="text-gray-600">{job.location}</p>
//                 </div>
//                 {/* Right Side: Apply Button */}
//                 <div>
//                   <a
//                     href={job.applyLink}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
//                   >
//                     Apply Now
//                   </a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       );
// }

// export default SuggestedJobsList



// Example in SuggestedJobsList.jsx

// SuggestedJobsList.jsx

import React, {useEffect, useMemo, useState} from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Optional: For loading indicators

const SuggestedJobsList = ({ jobRolesSuggested }) => {
  const [jobs, setJobs] = useState([]); // Stores extracted job data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize jobRolesSuggested to prevent unnecessary re-renders
  const memoizedJobRolesSuggested = useMemo(() => jobRolesSuggested, [jobRolesSuggested]);

  useEffect(() => {
    const fetchJobsForRoles = async () => {
      if (!memoizedJobRolesSuggested || memoizedJobRolesSuggested.length === 0) {
        setError('No job roles suggested.');
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const consolidatedKeywords = memoizedJobRolesSuggested.join(',');

        // Make a single API call with consolidated keywords
        const response = await axios.get('/api/jobs/suggested', {
          params: { keywords: consolidatedKeywords },
          responseType: 'text', // Expecting HTML as text
        });

        const htmlString = response.data;

        // Parse HTML response and extract job details
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const jobElements = doc.querySelectorAll('li'); // Adjust the selector based on actual HTML structure

        const extractedJobs = Array.from(jobElements).map((li) => {
          const titleElement = li.querySelector('.base-search-card__title');
          const jobTitle = titleElement ? titleElement.textContent.trim() : 'No Title';

          const companyElement = li.querySelector('.base-search-card__subtitle a');
          const companyName = companyElement ? companyElement.textContent.trim() : 'No Company';

          const locationElement = li.querySelector('.job-search-card__location');
          const location = locationElement ? locationElement.textContent.trim() : 'No Location';

          const applyLinkElement = li.querySelector('.base-card__full-link');
          const applyLink = applyLinkElement ? applyLinkElement.getAttribute('href') : '#';

          return {
            jobTitle,
            companyName,
            location,
            applyLink,
          };
        });

        // Remove duplicate jobs based on 'applyLink'
        const uniqueJobsMap = new Map();
        extractedJobs.forEach((job) => {
          if (!uniqueJobsMap.has(job.applyLink)) {
            uniqueJobsMap.set(job.applyLink, job);
          }
        });
        const uniqueJobs = Array.from(uniqueJobsMap.values());

        setJobs(uniqueJobs);
      } catch (err) {
        console.error('Error fetching jobs:', err);

        if (err.response && err.response.status === 429) {
          setError('You have made too many requests. Please try again later.');
        } else if (err.response && err.response.data && err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError('An error occurred while fetching job suggestions.');
        }

        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobsForRoles();
  }, [memoizedJobRolesSuggested]);

  if (loading) {
    return (
      <div className="bg-white text-black p-4 rounded shadow mb-4 flex items-center justify-center">
        <ClipLoader color="#000000" loading={loading} size={30} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white text-black p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Suggested Jobs</h3>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white text-black p-4 rounded shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Suggested Jobs</h3>
        <p className="text-gray-500">No job suggestions available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-black p-4 rounded shadow mt-6 overflow-auto max-h-96">
      <div className="grid gap-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex justify-between items-center border p-4 rounded hover:shadow-lg transition-shadow"
          >
            {/* Left Side: Job Details */}
            <div>
              <h4 className="text-md font-medium">{job.jobTitle}</h4>
              <p className="text-gray-700">{job.companyName}</p>
              <p className="text-gray-600">{job.location}</p>
            </div>
            {/* Right Side: Apply Button */}
            <div className="min-w-fit">
              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-customBlue text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedJobsList;

