import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profileInfo: {
      sport: '',
      level: '',
      availibility: {
        Mon: { Morning: false, Afternoon: false, Evening: false },
        Tue: { Morning: false, Afternoon: false, Evening: false },
        Wed: { Morning: false, Afternoon: false, Evening: false },
        Thu: { Morning: false, Afternoon: false, Evening: false },
        Fri: { Morning: false, Afternoon: false, Evening: false },
        Sat: { Morning: false, Afternoon: false, Evening: false },
        Sun: { Morning: false, Afternoon: false, Evening: false },
      },
    },
  });


  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
