import { createContext, useContext, useState } from "react";

export const StateContext = createContext({
  selectedReservation: undefined,
  setSelectedReservation: () => {},
});

export function useStateContext() {
  return useContext(StateContext);
}

export default function StateProvider({ children }) {
  const [selectedReservation, setSelectedReservation] = useState();

  return (
    <StateContext.Provider
      value={{
        selectedReservation: selectedReservation,
        setSelectedReservation: setSelectedReservation,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
