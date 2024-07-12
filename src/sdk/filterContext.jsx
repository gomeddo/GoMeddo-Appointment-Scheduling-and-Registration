import { createContext, useCallback, useContext, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// Create a context for filters with default values and setter functions
export const FilterContext = createContext({
  date: new Date(), // Default date is current date
  setDate: () => {}, // Default setter function for date
  timeFrame: "all", // Default time frame is 'all'
  setTimeFrame: () => {}, // Default setter function for time frame
  search: "", // Default search string is empty
  setSearch: () => {}, // Default setter function for search string
  price: undefined, // Default price is undefined
  setPrice: () => {}, // Default setter function for price
});

// Custom hook to consume the FilterContext
export function useFilterContext() {
  return useContext(FilterContext);
}

// Provider component for the FilterContext
export default function FilterProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to manage URL search parameters

  // Function to update search parameters
  const setSearchValue = useCallback(
    (key, value) =>
      setSearchParams((params) => {
        if (value != null)
          params.set(key, value); // Set parameter if value is not null
        else params.delete(key); // Delete parameter if value is null
        return params;
      }),
    [setSearchParams]
  );

  // Parse and memoize date from search parameters
  const dateString = searchParams.get("date");
  const date = useMemo(() => {
    return dateString != null ? new Date(dateString) : new Date(); // Use current date if date string is not present
  }, [dateString]);

  return (
    <FilterContext.Provider
      value={{
        date: date, // Current date or parsed date from search parameters
        setDate: (date) =>
          setSearchValue("date", new Date(date).toISOString().slice(0, 10)), // Setter function to update 'date' parameter
        timeFrame: searchParams.get("timeFrame") ?? "all", // Current time frame from search parameters or 'all'
        setTimeFrame: (timeFrame) => setSearchValue("timeFrame", timeFrame), // Setter function to update 'timeFrame' parameter
        search: searchParams.get("search"), // Current search string from search parameters
        setSearch: (search) => setSearchValue("search", search), // Setter function to update 'search' parameter
        price: Number(searchParams.get("price")) || undefined, // Current price from search parameters, converted to number or undefined
        setPrice: (price) => setSearchValue("price", price), // Setter function to update 'price' parameter
      }}
    >
      {children} {/* Render children components */}
    </FilterContext.Provider>
  );
}
