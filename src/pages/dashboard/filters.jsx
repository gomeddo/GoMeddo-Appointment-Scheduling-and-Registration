import { Calendar, Search } from "react-feather";
import Button from "../../components/button";

export default function Filters() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 xl:gap-6">
      <div className="flex flex-col gap-4">
        <div className="ring-1 ring-gray-300 flex flex-row gap-3 p-3 rounded-md items-center text-blue-dark">
          <Search className="size-6" />
          <input
            placeholder="Search..."
            className="placeholder:text-blue-dark placeholder:font-medium h-full w-full !outline-none"
          />
        </div>
        <div className="flex flex-row gap-4">
          <Button>Search...</Button>
          <Button>Price</Button>
          <Button>Deals</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="ring-1 ring-gray-300 flex flex-row gap-3 p-3 rounded-md items-center text-blue-dark">
          <Calendar className="size-6" />
          <input
            placeholder="Search..."
            className="placeholder:text-blue-dark placeholder:font-medium h-full w-full !outline-none"
            type="date"
          />
        </div>
        <div className="flex flex-row gap-4">
          <Button>All</Button>
          <Button>Morning</Button>
          <Button>Afternoon</Button>
          <Button>Evening</Button>
        </div>
      </div>
    </div>
  );
}
