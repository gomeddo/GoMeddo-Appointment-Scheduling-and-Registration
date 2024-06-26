import { createContext, useContext, useState } from "react";

export const GomeddoContext = createContext({
  gomeddo: undefined,
});

export function useGomeddoContext() {
  return useContext(GomeddoContext);
}

export default function GomeddoProvider({ children }) {
  const [gomeddo, setGomeddo] = useState(undefined);

  return (
    <GomeddoContext.Provider
      value={{
        gomeddo: gomeddo,
      }}
    >
      {children}
    </GomeddoContext.Provider>
  );
}
