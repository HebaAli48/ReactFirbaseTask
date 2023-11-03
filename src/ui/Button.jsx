import React from "react";

const Button = ({ children, className = "", onClick, type = "button" }) => {
  const clickHandler = () => {
    if (onClick) onClick();
  };
  return (
    <button
      type={type}
      onClick={() => clickHandler()}
      className={` bg-blue-600 hover:bg-blue-400 border-2 border-blue-400 hover:border-slate-300 rounded-lg px-2 py-1 text-md text-white transition-all ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
