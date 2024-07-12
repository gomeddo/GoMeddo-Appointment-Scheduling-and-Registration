import { useMemo } from "react"; // Import useMemo hook from React
import Skeleton from "../../components/skeleton"; // Import Skeleton component
import {
  FIELD_RESOURCE_DEFAULT_PRICE,
  MESSAGE_NO_CLINIC_MATCH_SEARCH,
} from "../../sdk/constants"; // Import constants from SDK
import { useFilterContext } from "../../sdk/filterContext"; // Import the filter context
import {
  useDentistResources,
  useRoomReservationResources,
  useStaffResources,
} from "../../sdk/hooks"; // Import custom hooks for fetching resources
import DentistCard from "./dentistCard"; // Import DentistCard component
import Filters from "./filters"; // Import Filters component

// Define time frame ranges and corresponding labels
const timeFrameRanges = {
  all: [6, 24],
  morning: [6, 12],
  afternoon: [12, 16],
  evening: [16, 24],
};

// Define price ranges and corresponding labels
const priceRanges = {
  50: [50, 100],
  100: [100, 150],
  150: [150, 200],
  200: [200, 250],
};

export default function DashboardPage() {
  // Fetch dentist and room resources using custom hooks
  const { isLoading: dentistLoading, dentists, rooms } = useDentistResources();

  // Fetch staff resources using custom hook
  const { isLoading: staffLoading, staffIds, staff } = useStaffResources();

  // Use useMemo to memoize room IDs for useRoomReservationResources hook dependency
  const roomIds = useMemo(() => rooms.map((room) => room.id), [rooms]);

  // Fetch room reservations based on room IDs and staff IDs using custom hook
  const { isLoading: reservationLoading, reservations } =
    useRoomReservationResources(roomIds, staffIds);

  // Get the search term from the filter context
  const { search, price, timeFrame } = useFilterContext();

  // Filter dentists based on the search term, price, and time frame
  const filteredDentists = useMemo(() => {
    let filteredDentists = dentists;

    // Filter by search term
    if (search != null && !!search.length) {
      const searchTerm = search.toLowerCase();
      filteredDentists = filteredDentists.filter((dentist) =>
        dentist.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by price range
    if (price != null) {
      const priceRange = priceRanges[price];
      filteredDentists = filteredDentists.filter((dentist) => {
        const price = dentist.getCustomProperty(FIELD_RESOURCE_DEFAULT_PRICE);
        return price >= priceRange[0] && price <= priceRange[1];
      });
    }

    return filteredDentists;
  }, [search, price, dentists]);

  // Filter reservations based on selected time frame
  const filteredReservations = useMemo(() => {
    if (!timeFrame) return reservations; // Return all reservations if no time frame is selected
    const range = timeFrameRanges[timeFrame];
    return reservations.filter((reservation) => {
      const start = new Date(reservation.startDatetime);
      return start.getHours() >= range[0] && start.getHours() <= range[1];
    });
  }, [timeFrame, reservations]);

  return (
    <div className="flex flex-col gap-6">
      <Filters /> {/* Render filters component */}
      {/* Display skeleton loaders while dentist data is loading */}
      {dentistLoading &&
        Array.from(Array(10).keys()).map((i) => (
          <Skeleton key={i} className="h-96" />
        ))}
      {/* Render message if no dentists match the search query */}
      {!dentistLoading && filteredDentists.length === 0 && (
        <div className="text-center text-grey text-3xl font-bold pt-40">
          {MESSAGE_NO_CLINIC_MATCH_SEARCH}
        </div>
      )}
      {/* Render dentist cards once data is loaded */}
      {!dentistLoading &&
        filteredDentists.map((dentist) => {
          // Filter rooms for the current dentist
          const dentistRooms = rooms.filter(
            (room) => room.parentId === dentist.id
          );
          const roomIds = dentistRooms.map((room) => room.id);

          // Filter reservations for the current dentist's rooms
          const roomReservations = filteredReservations.filter((reservation) =>
            roomIds.includes(reservation.getCustomProperty("B25__Resource__c"))
          );

          return (
            // Render DentistCard component for each dentist
            <DentistCard
              key={dentist.id}
              dentistResource={dentist}
              roomResources={dentistRooms}
              reservationResources={roomReservations}
              reservationsLoading={reservationLoading}
            />
          );
        })}
    </div>
  );
}
