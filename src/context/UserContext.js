import React, { createContext, useState, useContext } from 'react';

// This context allows us to share user profile data (name, photo, etc.)
// across ALL screens in the app without needing to pass props through every navigator.
const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({
    fullName: 'Friend', // Default fallback name
    email: '',
    profileImage: null, // Will hold the local URI of the profile picture
  });

  // A helper to update specific fields without overwriting the whole object
  const updateUser = (newData) => {
    setUserData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook so screens can simply call: const { userData, updateUser } = useUser();
export function useUser() {
  return useContext(UserContext);
}
