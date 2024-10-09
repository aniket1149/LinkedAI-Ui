// src/app/components/MiddleColumn.jsx

'use client'; // Ensure this is a Client Component

import React from 'react';
import ContactInfo from './section_components/ContactInfo';
import Headline from './section_components/Headline';
import About from './section_components/About';
import Experience from './section_components/Experience';
import Education from './section_components/Education';
import Skills from './section_components/Skills';
import Projects from './section_components/Projects';
import VolunteerExperience from './section_components/VolunteerExperience';
import Accomplishments from './section_components/Accomplishments';
import Interests from './section_components/Interests';
import Comments from './section_components/Comments';


const MiddleColumn = ({ resumeData }) => {
  if (!resumeData) {
    return (
      <div className="bg-white text-black p-6 shadow h-full flex items-center justify-center">
        <h1 className="text-xl font-bold mb-4 text-black">Awaiting Resume Data for intitalizing gpt model</h1>
      </div>
    );
  }

  const {
    contactInfo,
    headline,
    about,
    experience,
    education,
    skills,
    projects,
    volunteerExperience,
    accomplishments,
    interests,
    comments
  } = resumeData;

  return (
    <div className="bg-white text-black p-6 rounded shadow h-full overflow-auto">
      <ContactInfo contactInfo={contactInfo} />
      <Headline headline={headline} />
      <About about={about} />
      <Experience experience={experience} />
      <Education education={education} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <VolunteerExperience volunteerExperience={volunteerExperience} />
      <Accomplishments accomplishments={accomplishments} />
      <Interests interests={interests} />
      <Comments comments={comments} />
    </div>
  );
};

export default MiddleColumn;
