import React from 'react';

const ContactInfo = ({ contactInfo }) => {
  if (!contactInfo) return null;

  const { fullName, linkedin, phone, email, location } = contactInfo;

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">{fullName}</h2>
      <p><strong>Email:</strong> <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a></p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>LinkedIn:</strong> <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{linkedin}</a></p>
      <p><strong>Location:</strong> {location}</p>
    </div>
  );
};

export default ContactInfo;
