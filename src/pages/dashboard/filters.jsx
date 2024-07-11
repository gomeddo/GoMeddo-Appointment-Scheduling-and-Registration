import { Calendar, Search, X } from "react-feather";
import Button from "../../components/button";
import { useFilterContext } from "../../sdk/filterContext";
import { useRef, useState } from "react";
import clsx from "clsx";
import {
  LABEL_SEARCH,
  LABEL_PRICE,
  TIME_FRAME_ALL,
  TIME_FRAME_MORNING,
  TIME_FRAME_AFTERNOON,
  TIME_FRAME_EVENING,
} from "../../sdk/constants";

const timeFrames = [
  TIME_FRAME_ALL.toLowerCase(),
  TIME_FRAME_MORNING.toLowerCase(),
  TIME_FRAME_AFTERNOON.toLowerCase(),
  TIME_FRAME_EVENING.toLowerCase(),
];

const prices = [50, 100, 150, 200];

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
  } = useFilterContext();

  const [showPrice, setShowPrice] = useState(false);
  const searchRef = useRef();

  const handleSearchChange = () => {
    setSearch(searchRef.current.value);
  };

  const handleClearSearch = () => {
    setSearch(""); // Clear the search context
    searchRef.current.value = ""; // Clear the input field
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xl:gap-6">
      <div className="flex flex-col gap-4">
        <div className="ring-1 ring-gray-300 flex flex-row gap-3 p-3 rounded-md items-center text-blue-dark">
          <Search className="size-6" />
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
        <div className="flex flex-row gap-4">
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
      <div className="flex flex-col gap-4">
        <div className="ring-1 ring-gray-300 flex flex-row gap-3 p-3 rounded-md items-center text-blue-dark">
          <Calendar className="size-6" />
          <input
            placeholder={LABEL_SEARCH}
            className="placeholder:text-blue-dark placeholder:font-medium h-full w-full !outline-none"
            type="date"
            value={date.toISOString().slice(0, 10)}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex flex-row gap-4">
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
