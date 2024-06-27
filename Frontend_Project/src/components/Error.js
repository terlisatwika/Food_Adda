// Error.js

import React from 'react';

const Error = ({ error }) => {
  return (
    <div className="container border rounded my-5 py-5 shadow text-center" style={{ height: "auto", width: "720px" }}>
      <h1 className="text-danger">Oops!!!</h1>
      <h2>Something went wrong!!</h2>
      {error && (
        <>
          <h3>
            {error.status}: {error.statusText}
          </h3>
          <h3>{error.message}</h3>
        </>
      )}
    </div>
  );
};

export default Error;
