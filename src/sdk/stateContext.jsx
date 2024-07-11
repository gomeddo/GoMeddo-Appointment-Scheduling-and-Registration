import { createContext, useContext, useState } from "react";

// Create a context for the state
export const StateContext = createContext({
  selectedDentist: undefined,
  selectedReservation: undefined, // Initial state for selected reservation
  setSelectedReservation: () => {}, // Placeholder for the function to set the selected reservation
  setSelectedDentist: () => {},
});

// Custom hook to use the state context
export function useStateContext() {
  return useContext(StateContext); // Use the context created above
}

// State provider component to wrap around components that need access to the state
export default function StateProvider({ children }) {
  const [selectedReservation, setSelectedReservation] = useState(); // State to hold the selected reservation
  const [selectedDentist, setSelectedDentist] = useState();

  return (
    <StateContext.Provider
      value={{
        selectedReservation: selectedReservation, // Provide the current selected reservation
        selectedDentist: selectedDentist,
        setSelectedReservation: setSelectedReservation, // Provide the function to update the selected reservation
        setSelectedDentist: setSelectedDentist,
      }}
    >
      {children}
      {/* Render children components that will have access to the state context */}
    </StateContext.Provider>
  );
}
