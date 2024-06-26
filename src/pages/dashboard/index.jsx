import { AppointmentCard } from "./appointmentCard";
import { useAppointments } from "../../sdk/hooks";
import Filters from "./filters";
import Skeleton from "../../components/skeleton";

export default function DashboardPage() {
  const { isLoading, appointments } = useAppointments();
  console.log(appointments);

  return (
    <div className="flex flex-col gap-6">
      <Filters />
      {isLoading &&
        Array.from(Array(10).keys()).map((i) => (
          <Skeleton key={i} className="h-96" />
        ))}
      {!!appointments && (
        <>
          {appointments.map((appointment) => (
            <AppointmentCard key={appointment.id} {...appointment} />
          ))}
        </>
      )}
    </div>
  );
}
