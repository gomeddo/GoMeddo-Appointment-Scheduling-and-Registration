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
  const { isLoading: dentistLoading, dentists, rooms } = useDentistResources();
  const roomIds = useMemo(() => rooms.map((room) => room.id), [rooms]);

  const { staff } = useStaffResources();
  const { isLoading: reservationLoading, reservations } =
    useRoomReservationResources(roomIds);

  return (
    <div className="flex flex-col gap-6">
      <Filters />
      {dentistLoading &&
        Array.from(Array(10).keys()).map((i) => (
          <Skeleton key={i} className="h-96" />
        ))}

      {!dentistLoading &&
        !!dentists &&
        !!rooms &&
        dentists.map((dentist) => {
          const dentistRooms = rooms.filter(
            (room) => room.parentId === dentist.id
          );
          const roomIds = dentistRooms.map((room) => room.id);
          const roomReservations = reservations.filter((reservation) =>
            roomIds.includes(reservation.getCustomProperty("B25__Resource__c"))
          );

          return (
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
