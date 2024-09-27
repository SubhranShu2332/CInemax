import { createContext, useState } from 'react';

// Create the Admin Context
export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // Auth state

  // Function to simulate admin login (You can implement real authentication here)
  const loginAdmin = (username, password) => {
    // Dummy check for login (In a real app, you'd make a request to a backend service)
    if (username === "admin" && password === "password") {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
      alert('Invalid credentials');
    }
  };

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, loginAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};
