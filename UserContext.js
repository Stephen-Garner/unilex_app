import React, { createContext, useState } from "react";
import profiles from "./StudentProfiles"; // Import StudentProfiles.js

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Initial state for the current user
  const [currentUserId, setCurrentUserId] = useState("1"); // Default user ID

  // Find the current user's details in StudentProfiles.js
  const currentUser = profiles.find((profile) => profile.studentId === currentUserId) || {
    firstName: "Unknown",
    lastName: "",
    country: "Unknown",
    bio: "No bio available.",
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUserId }}>
      {children}
    </UserContext.Provider>
  );
};
