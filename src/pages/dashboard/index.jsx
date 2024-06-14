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
    <button
      {...props}
      className="truncate text-lg font-medium border border-blue-black rounded-md p-2 text-center hover:bg-blue-dark hover:text-white transition-all"
    />
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
    <div className="border-2 border-black rounded-lg p-4 flex gap-4 items-center">
      <Calendar />
      <div className="flex-1">Date</div>
      <ChevronDown />
    </div>
  );
}

function AppointmentCard() {
  return (
    <div className="rounded-lg border border-blue-dark p-6 text-blue-dark grid grid-cols-2 gap-6">
      <div>
        <div className="text-2xl font-medium">Bright Smiles New York</div>
        <div>Stoltenberg Island, West Kieth, DE 97885-0768</div>
        <div className="text-sm py-4">
          Excellent <span className="font-medium">9.2</span>
        </div>
        <img src={Sample1} />
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
        <ArrowRight className="ms-auto size-10" />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="bg-white mx-16 px-16 py-8 rounded-lg flex flex-col gap-12">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <SearchBar />
        </div>
        <DatePicker />
        <div className="col-span-2 flex flex-col gap-4">
          <div className="grid grid-cols-5 gap-6">
            <FilterButton>Recommended</FilterButton>
            <FilterButton>Distance</FilterButton>
            <FilterButton>Price</FilterButton>
            <FilterButton>Deals</FilterButton>
            <FilterButton>Stars</FilterButton>
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <div className="grid grid-cols-4 gap-6">
            <FilterButton>All</FilterButton>
            <FilterButton>Morning</FilterButton>
            <FilterButton>Afternoon</FilterButton>
            <FilterButton>Evening</FilterButton>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 max-w-4xl mx-auto">
        {Array.from(Array(10).keys()).map((i) => (
          <AppointmentCard key={i} />
        ))}
      </div>
    </div>
  );
}
