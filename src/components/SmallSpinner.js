import React, {useContext} from 'react';
import {DarkModeContext} from '../context/DarkModeContext';

import '../styles/SmallSpinner.css';

const SmallSpinner = () => {
  const {isDarkMode} = useContext(DarkModeContext);
  return (
    <div className={`spinner ${isDarkMode ? 'dark-mode': ''}`}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  );
}
 
export default SmallSpinner;