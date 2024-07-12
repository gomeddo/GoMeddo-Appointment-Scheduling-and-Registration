import clsx from "clsx"; // Importing clsx library for conditional class names
import { useRef, useState } from "react"; // Importing useRef and useState hooks from React
import { Calendar, Search, X } from "react-feather"; // Importing icons from react-feather
import Button from "../../components/button"; // Importing Button component
import {
  LABEL_PRICE,
  LABEL_SEARCH,
  TIME_FRAME_AFTERNOON,
  TIME_FRAME_ALL,
  TIME_FRAME_EVENING,
  TIME_FRAME_MORNING,
} from "../../sdk/constants"; // Importing constants from SDK
import { useFilterContext } from "../../sdk/filterContext"; // Importing custom hook from filter context

// Constants for time frames and prices
const timeFrames = [
  TIME_FRAME_ALL.toLowerCase(),
  TIME_FRAME_MORNING.toLowerCase(),
  TIME_FRAME_AFTERNOON.toLowerCase(),
  TIME_FRAME_EVENING.toLowerCase(),
];

const prices = [50, 100, 150, 200]; // Array of price ranges

export default function Filters() {
  const {
    date,
    setDate,
    search,
    setSearch,
    timeFrame,
    setTimeFrame,
    price,
    setPrice,
  } = useFilterContext(); // Using custom filter context to manage state

  const [showPrice, setShowPrice] = useState(false); // State to toggle display of price filter dropdown
  const searchRef = useRef(); // Ref for search input field

  // Handler for handling search input change
  const handleSearchChange = () => {
    setSearch(searchRef.current.value); // Update search context with input value
  };

  // Handler for clearing search input
  const handleClearSearch = () => {
    setSearch(""); // Clear the search context
    searchRef.current.value = ""; // Clear the input field
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xl:gap-6">
      {/* Left column for search and price filters */}
      <div className="flex flex-col gap-4">
        {/* Search filter */}
        <div className="ring-1 ring-gray-300 flex flex-row gap-3 p-3 rounded-md items-center text-blue-dark">
          <Search className="size-6" /> {/* Search icon */}
          <input
            ref={searchRef}
            placeholder={LABEL_SEARCH}
            className="placeholder:text-blue-dark placeholder:font-medium h-full w-full !outline-none"
            defaultValue={search}
            onChange={handleSearchChange}
          />
          {!!search && ( // Render 'X' only if search is not empty
            <X className="cursor-pointer" onClick={handleClearSearch} />
          )}
        </div>
        {/* Price filter */}
        <div className="flex flex-row gap-4">
          {/* Button to apply search filter */}
          <Button
            active={!!search && !!search.length}
            onClick={handleSearchChange}
          >
            {!!search && !!search.length && (
              <X
                className="inline-block size-5 me-2"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleClearSearch();
                }}
              />
            )}
            {LABEL_SEARCH}
          </Button>
          {/* Dropdown for price filter */}
          <div className="relative">
            <Button
              active={price != null}
              onClick={() => setShowPrice((state) => !state)}
            >
              {price != null && (
                <X
                  className="inline-block size-5 me-2"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setPrice();
                  }}
                />
              )}
              {LABEL_PRICE}
              {price != null && <>{` - $${price} to $${price + 50}`}</>}
            </Button>
            {/* Dropdown menu for price filter */}
            <div
              className={clsx(
                "border border-gray-300 rounded-md mt-3 bg-white absolute p-4 drop-shadow-2xl flex-col gap-4",
                {
                  flex: showPrice,
                  hidden: !showPrice,
                }
              )}
            >
              <div className="font-medium">{LABEL_PRICE}</div>
              {/* Buttons for each price range */}
              {prices.map((p) => (
                <Button
                  key={p}
                  active={price === p}
                  onClick={() => {
                    setShowPrice(false);
                    setPrice(p);
                  }}
                >{`$${p} to $${p + 50}`}</Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Right column for date and time frame filters */}
      <div className="flex flex-col gap-4">
        {/* Date filter */}
        <div className="ring-1 ring-gray-300 flex flex-row gap-3 p-3 rounded-md items-center text-blue-dark">
          <Calendar className="size-6" /> {/* Calendar icon */}
          <input
            placeholder={LABEL_SEARCH}
            className="placeholder:text-blue-dark placeholder:font-medium h-full w-full !outline-none"
            type="date"
            value={date.toISOString().slice(0, 10)} // Format date value
            onChange={(e) => setDate(e.target.value)} // Update date context with input value
          />
        </div>
        {/* Time frame filter */}
        <div className="flex flex-row gap-4">
          {/* Buttons for each time frame */}
          {timeFrames.map((t) => (
            <Button
              key={t}
              active={timeFrame === t}
              onClick={() => setTimeFrame(t)}
              className="capitalize"
            >
              {t}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
