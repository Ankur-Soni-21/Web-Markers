import React from "react";

function Container({ children, className, ...props }) {
  return (
    <div className={`border-solid border-2 border-white ${className}`}>
      {children}
    </div>
  );
}

export default Container;
