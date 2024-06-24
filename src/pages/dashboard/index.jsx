import { AppointmentCard } from "./appointmentCard";
import Filters from "./filters";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <Filters />
      {Array.from(Array(10).keys()).map((i) => (
        <AppointmentCard key={i} />
      ))}
    </div>
  );
}
