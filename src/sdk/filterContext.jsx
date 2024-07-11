import { createContext, useCallback, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const FilterContext = createContext({
  date: new Date(),
  setDate: () => {},
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

  const dateString = searchParams.get("date");
  const date = dateString != null ? new Date(dateString) : new Date();

  return (
    <FilterContext.Provider
      value={{
        date: date,
        setDate: (date) =>
          setSearchValue("date", new Date(date).toISOString().slice(0, 10)),
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
