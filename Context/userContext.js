
import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState({
//  // Initialize with user data
//  uid: 'your-user-id',
//  name: "email",
//  // Add other user data as needed    
//   }); // You can initialize it with user data
const [user, setUser] = useState(null); // Initialize with null

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};