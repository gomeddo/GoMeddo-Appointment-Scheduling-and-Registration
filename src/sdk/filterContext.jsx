import { createContext, useCallback, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const FilterContext = createContext({
  timeFrame: "all",
  setTimeFrame: () => {},
  search: "",
  setSearch: () => {},
  price: undefined,
  setPrice: () => {},
});

export function useFilterContext() {
  return useContext(FilterContext);
}

export default function FilterProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchValue = (key, value) =>
    setSearchParams((state) => {
      if (value != null) state.set(key, value);
      else state.delete(key);
      return state;
    });

  return (
    <FilterContext.Provider
      value={{
        timeFrame: searchParams.get("timeFrame") ?? "all",
        setTimeFrame: (timeFrame) => setSearchValue("timeFrame", timeFrame),
        search: searchParams.get("search"),
        setSearch: (search) => setSearchValue("search", search),
        price: Number(searchParams.get("price")) || undefined,
        setPrice: (price) => setSearchValue("price", price),
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
