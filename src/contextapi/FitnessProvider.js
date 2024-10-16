import React, { createContext, useState, useEffect } from "react";

const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  const [workoutEntries, setWorkoutEntries] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem("token"); 
    if (token) {
      setIsAuthenticated(true); 
    }

    const storedEntries = JSON.parse(localStorage.getItem("workoutEntries"));
    if (storedEntries) {
      setWorkoutEntries(storedEntries);
    }
  }, []);

  const addWorkoutEntry = (entry) => {
    const newEntries = [...workoutEntries, entry];
    setWorkoutEntries(newEntries);
    localStorage.setItem("workoutEntries", JSON.stringify(newEntries));
  };

  return (
    <FitnessContext.Provider value={{ workoutEntries, addWorkoutEntry, isAuthenticated }}>
      {children}
    </FitnessContext.Provider>
  );
};

export default FitnessContext;
