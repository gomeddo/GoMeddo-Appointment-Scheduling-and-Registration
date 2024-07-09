import DentistCard from "./dentistCard";
import { useDentists } from "../../sdk/hooks";
import Filters from "./filters";
import Skeleton from "../../components/skeleton";

export default function DashboardPage() {
  const { isLoading, dentists } = useDentists();

  return (
    <div className="flex flex-col gap-6">
      <Filters />
      {isLoading &&
        Array.from(Array(10).keys()).map((i) => (
          <Skeleton key={i} className="h-96" />
        ))}
      {!!dentists && (
        <>
          {dentists.map((dentists) => (
            <DentistCard key={dentists.id} {...dentists} />
          ))}
        </>
      )}
    </div>
  );
}
