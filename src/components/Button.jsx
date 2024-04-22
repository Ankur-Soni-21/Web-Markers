import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg flex flex-row gap-3 hover:underline ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
