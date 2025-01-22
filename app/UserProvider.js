import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileInfo: {
      game: '',
      sport: '',
      availibility: {
        days: { Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false, Sun: false },
        times: { Morning: false, Afternoon: false, Evening: false },
      },
    },
  });

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
