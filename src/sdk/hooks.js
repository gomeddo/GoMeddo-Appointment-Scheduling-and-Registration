import { useEffect, useMemo, useState } from "react";
import GoMeddo from "@gomeddo/sdk";

export function useGomeddo() {
  return useMemo(() => {
    return new GoMeddo(import.meta.env.VITE_GOMEDDO_KEY);
  }, []);
}

export function useDentistResources() {
  const gomeddo = useGomeddo();

  const [isLoading, setIsLoading] = useState(true);
  const [dentists, setDentists] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const trigger = async () => {
      setIsLoading(true);

      try {
        const results = await gomeddo
          .buildResourceRequest()
          .includeAllResourcesAt("a0Zbn000000gzqHEAQ")
          .includeAdditionalField([
            "Dentist_City__c",
            "Dentist_Location__c",
            "Dentist_Rating__c",
            "B25__Image_Url__c",
            "B25__Default_Price__c",
          ])
          .getResults();

        const resourceIds = results.getResourceIds();
        const resources = resourceIds.map((id) => results.getResource(id));
        const cityResources = resources.filter(
          (resource) => resource.parentId === "a0Zbn000000gzqHEAQ"
        );
        const dentistResources = cityResources.flatMap((city) =>
          resources.filter((resource) => resource.parentId === city.id)
        );
        const roomResources = dentistResources.flatMap((dentist) =>
          resources.filter((resource) => resource.parentId === dentist.id)
        );

        setDentists(dentistResources);
        setRooms(roomResources);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    trigger();
  }, [gomeddo]);

  return {
    isLoading,
    dentists,
    rooms,
  };
}

export function useStaffResources() {
  const gomeddo = useGomeddo();

  const [isLoading, setIsLoading] = useState(true);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const trigger = async () => {
      try {
        const results = await gomeddo
          .buildDimensionRecordRequest("B25__Staff__c")
          .getResults();

        const objectIds = results.getObjectIds();
        const records = objectIds.map((id) => results.getDimensionRecord(id));

        setStaff(records);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    trigger();
  }, [gomeddo]);

  return {
    isLoading,
    staff,
  };
}

export function useRoomReservationResources(roomIds) {
  const gomeddo = useGomeddo();

  const [isLoading, setIsLoading] = useState(true);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    if (!roomIds.length) return;

    const trigger = async () => {
      try {
        setIsLoading(true);

        const start = new Date();
        start.setHours(6, 0, 0, 0);

        const end = new Date(start);
        end.setHours(24, 0, 0, 0);

        const timeSlots = await gomeddo
          .buildTimeSlotsRequest(start, end)
          .withField("B25__Resource__c", roomIds)
          .withDuration(30)
          .getResults();

        const reservations = timeSlots
          .getTimeSlots()
          .flatMap((timeSlot) => timeSlot.getReservations());

        setReservations(reservations);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    trigger();
  }, [gomeddo, roomIds]);

  return {
    isLoading,
    reservations,
  };
}
