import React, {useState, createContext} from 'react';

export const DarkModeContext = createContext();

export const DarkModeProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  return( 
    <DarkModeContext.Provider value={{isDarkMode, setIsDarkMode}}>
      {props.children}
    </DarkModeContext.Provider>
  )
}

