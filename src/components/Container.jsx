import React from "react";

function Container({ children, className, ...props }) {
  return (
    <div className={` ${className}`}>
      {children}
    </div>
  );
}

export default Container;
