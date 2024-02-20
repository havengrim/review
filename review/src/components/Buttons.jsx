import React from 'react';

const Buttons = ({ onClick, styles, buttonText }) => {
  return (
    <button 
      type="button" 
      className={`py-2 px-4 text-white font-poppins font-medium text-[18px] outline-none ${styles} rounded-[10px]`}
      onClick={onClick} // Ensure onClick is defined
    >
      {buttonText}
    </button>
  )
}

export default Buttons;