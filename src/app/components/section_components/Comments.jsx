// src/app/components/Comments.jsx

import React from 'react';

const Comments = ({ comments }) => {
  if (!comments) return null;

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <p className="text-gray-700">{comments}</p>
    </div>
  );
};

export default Comments;
