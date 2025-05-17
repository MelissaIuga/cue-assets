import React, { createContext, useState } from "react";

// Create the context
export const ProfileImageContext = createContext();

// Create the provider component
export function ProfileImageProvider({ children }) {
  const [profileImage, setProfileImage] = useState("");

  return (
    <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
}