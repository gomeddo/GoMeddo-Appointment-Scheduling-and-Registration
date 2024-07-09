import DentistCard from "./dentistCard";
import {
  useDentistResources,
  useRoomReservationResources,
  useStaffResources,
} from "../../sdk/hooks";
import Filters from "./filters";
import Skeleton from "../../components/skeleton";
import { useMemo } from "react";

export default function DashboardPage() {
  // Fetch dentist and room resources using custom hooks
  const { isLoading: dentistLoading, dentists, rooms } = useDentistResources();
  // Use useMemo to memoize room IDs for useRoomReservationResources hook dependency
  const roomIds = useMemo(() => rooms.map((room) => room.id), [rooms]);

  // Fetch staff resources using custom hook
  const { staff } = useStaffResources();
  // Fetch room reservations based on room IDs using custom hook
  const { isLoading: reservationLoading, reservations } =
    useRoomReservationResources(roomIds);

  return (
    <div className="flex flex-col gap-6">
      <Filters /> {/* Render filters component */}
      {/* Display skeleton loaders while dentist data is loading */}
      {dentistLoading &&
        Array.from(Array(10).keys()).map((i) => (
          <Skeleton key={i} className="h-96" />
        ))}
      {/* Render dentist cards once data is loaded */}
      {!dentistLoading &&
        !!dentists &&
        !!rooms &&
        dentists.map((dentist) => {
          // Filter rooms for the current dentist
          const dentistRooms = rooms.filter(
            (room) => room.parentId === dentist.id
          );
          const roomIds = dentistRooms.map((room) => room.id);
          // Filter reservations for the current dentist's rooms
          const roomReservations = reservations.filter((reservation) =>
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
