import { Link } from "react-router-dom";
import Sample1 from "../../assets/sample_1.png";
import { Search, Calendar, ChevronDown, ArrowRight } from "react-feather";

function FilterButton(props) {
  return (
    <button
      {...props}
      className="truncate font-medium border-2 border-blue-black rounded-md p-2 text-center hover:bg-blue-medium hover:text-white transition-all"
    />
  );
}

function TimeSlotButton(props) {
  return (
    <Link to="/appointment/23" className="">
      <button
        {...props}
        className="truncate text-lg font-medium border border-blue-black rounded-md p-2 w-full text-center hover:bg-blue-dark hover:text-white transition-all"
      />
    </Link>
  );
}

function SearchBar() {
  return (
    <div className="border-2 border-black rounded-lg p-4 flex gap-4 items-center">
      <Search />
      <div>
        <input
          placeholder="City, Country"
          className="w-full border-none outline-none placeholder:text-blue-dark placeholder:font-medium"
        />
        <div className="font-medium text-xs">
          From London / Any week / Add guests
        </div>
      </div>
    </div>
  );
}

function DatePicker() {
  return (
    <div className="border-2 border-black rounded-lg p-4 flex gap-4 items-center h-full">
      <Calendar />
      <div className="flex-1">Date</div>
      <ChevronDown />
    </div>
  );
}

function AppointmentCard() {
  return (
    <div className="rounded-lg border border-blue-dark p-6 text-blue-dark grid md:grid-cols-2 gap-6">
      <div>
        <div className="text-2xl font-medium">Bright Smiles New York</div>
        <div>Stoltenberg Island, West Kieth, DE 97885-0768</div>
        <div className="text-sm py-4">
          Excellent <span className="font-medium">9.2</span>
        </div>
        <img src={Sample1} className="w-full" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-lg font-medium text-center">
          Week 15/5 - 20/5 2024
        </div>
        <TimeSlotButton>10:20 - 11:20</TimeSlotButton>
        <TimeSlotButton>10:20 - 11:20</TimeSlotButton>
        <TimeSlotButton>10:20 - 11:20</TimeSlotButton>
        <TimeSlotButton>10:20 - 11:20</TimeSlotButton>
        <div className="font-medium text-center">show more...</div>
        <Link
          to="confirmation/10"
          className="ms-auto hover:scale-105 transition-all"
        >
          <button>
            <ArrowRight className="size-10" />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="bg-white mx-8 md:mx-16 px-8 py-6 md:px-16 md:py-8 rounded-lg flex flex-col gap-6 xl:gap-12">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 xl:gap-6">
        <div className="lg:col-span-3 flex flex-col gap-3 xl:gap-6">
          <SearchBar />
          <div className="grid grid-cols-5 gap-3 xl:gap-6">
            <FilterButton>Recommended</FilterButton>
            <FilterButton>Distance</FilterButton>
            <FilterButton>Price</FilterButton>
            <FilterButton>Deals</FilterButton>
            <FilterButton>Stars</FilterButton>
          </div>
        </div>
        <div className="lg:col-span-2 flex flex-col gap-3 xl:gap-6">
          <div className="flex-1">
            <DatePicker />
          </div>
          <div className="grid grid-cols-4 gap-3 xl:gap-6">
            <FilterButton>All</FilterButton>
            <FilterButton>Morning</FilterButton>
            <FilterButton>Afternoon</FilterButton>
            <FilterButton>Evening</FilterButton>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 xl:gap-8 md:max-w-4xl md:mx-auto">
        {Array.from(Array(10).keys()).map((i) => (
          <AppointmentCard key={i} />
        ))}
      </div>
    </div>
  );
}
