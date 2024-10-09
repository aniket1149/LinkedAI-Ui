// src/app/page.js
'use client';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LeftColumn from './components/LeftColumn';
import MiddleColumn from './components/MiddleColumn';
import RightColumn from './components/RightColumn';

export default function Home() {
  const [resumeData, setResumeData] = useState('');
  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
       {/* <Navbar />  */}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Grid Container for Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Left Column */}
          <div className="md:col-span-2 h-full overflow-hidden">
            <LeftColumn setResumeData={setResumeData}  resumeData={resumeData}/>
          </div>

          {/* Middle Column */}
          <div className="md:col-span-6 h-full overflow-auto">
            <MiddleColumn resumeData={resumeData} />
          </div>

          {/* Right Column */}
          <div className="md:col-span-4 h-full overflow-auto">
            <RightColumn resumeData={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
