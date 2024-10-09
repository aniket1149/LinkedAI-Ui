// src/app/components/LeftColumn.jsx

'use client'; // Mark this component as a Client Component

import React, { useState } from 'react';
import pdfToText, * as pdftoText from'react-pdftotext'; 
import Image from 'next/image';
import logo from '@/app/pages/LinkedAiSIde.png'

const LeftColumn = ({ setResumeData, resumeData }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  var data = '';
  const firstName = (typeof resumeData?.contactInfo?.fullName === 'string' && resumeData.contactInfo.fullName.trim())
  ? resumeData.contactInfo.fullName.trim().split(/\s+/)[0]
  : null;

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setLoading(true);
      setMessage('Parsing PDF...');
      try {
        const text = await pdfToText(file);
        console.log(text); 
        
        setMessage('PDF parsed successfully!');
        try{
          const res = await fetch('http://localhost:8080/api/jobhelp/lnkdsect',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: "1",  
              resume: text,
             }),
          });

          if(res.ok){
            data = await res.json();
            setMessage('Resume data sent to server successfully!');
            console.log('Server response:', data);
            setResumeData(data);
          
          }else{
            setMessage('Failed to send resume data to server.');
            console.log("error api call", res);
          }
        }
      catch (error) {
          console.error('Error sending data to server:', error);
          setMessage('An unexpected error occurred while sending data to the server.');
        } 

      } catch (error) {
        console.error('Error parsing PDF:', error);
        setMessage('Failed to parse PDF.');
      } finally {
        setLoading(false);
      }
    } else {
      setMessage('Please select a valid PDF file.');
    }
  };



  return (
    <div className="pl-5 pb-7 flex flex-col justify-between bg-white text-black h-full  rounded shadow overflow-hidden">
    <div className="pb-5">
      <Image
              src={logo}
              alt="Logo"
              width={250} 
              height={120} 
              className="" 
            />
      </div>
    <div className="bg-white text-black flex flex-col ">
      
      <h1 className="text-xl font-bold my-5 text-black">Hi {firstName},</h1>
      
      {/* File Input */}
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
        id="file-upload"
        style={{ display: 'none' }}
      />
      
      {/* Label as Button */}
      <label
        htmlFor="file-upload"
        className={`w-full py-2 px-4 rounded ${
          loading
            ? 'bg-blue-300 cursor-not-allowed'
            : 'bg-customBlue hover:bg-blue-700'
        } text-white font-semibold text-center cursor-pointer`}
      >
        {loading ? 'Processing...' : 'Upload Resume'}
      </label>

      {/* Message Display */}
      {message && (
        <p className={`mt-4 text-sm h-full ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
    </div>
  );
};

export default LeftColumn;
