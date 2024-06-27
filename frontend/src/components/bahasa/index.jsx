import React, { useState } from "react";
import Amerika from "../../assets/amerika.png"
import Indo from "../../assets/indonesia.png"

function LanguageSwitch({ onChangeLanguage }) {
  const [isIndonesian, setIsIndonesian] = useState(true);

  const handleClick = () => {
    const newLanguage = !isIndonesian ? "id" : "en";
    setIsIndonesian((prevState) => !prevState);
    onChangeLanguage(newLanguage);
  };

  return (
    <button
      className="text-sm text-gray-500 hover:text-gray-700 focus:outline-none flex items-center mt-3"
      onClick={handleClick}
    >
      {isIndonesian ? (
        <>
          <img src={Amerika} alt="UK Flag" className="mr-2" style={{ width: '20px', height: 'auto' }} />
          Switch to English
        </>
      ) : (
        <>
          <img src={Indo} alt="Indonesia Flag" className="mr-2" style={{ width: '20px', height: 'auto' }} />
          Pindah ke Bahasa Indonesia
        </>
      )}
    </button>
  );
}

export default LanguageSwitch;
