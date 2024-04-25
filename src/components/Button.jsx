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
      className={`px-4 py-2 rounded-md w-4/5 flex flex-row gap-3 items-center hover:bg-gray-400 hover:text-white text-gray-400 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
