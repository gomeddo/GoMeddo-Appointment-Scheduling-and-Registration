import GoMeddo from "@gomeddo/sdk";
import { useEffect, useMemo, useState } from "react";
import {
  FIELD_RESERVATION_DURATION,
  FIELD_RESERVATION_END_TIME,
  FIELD_RESERVATION_RESOURCE_NAME,
  FIELD_RESERVATION_START_TIME,
  FIELD_RESERVATION_TOTAL_COST,
  FIELD_RESOURCE_CITY,
  FIELD_RESOURCE_DEFAULT_PRICE,
  FIELD_RESOURCE_IMG,
  FIELD_RESOURCE_OBJECT,
  FIELD_RESOURCE_STAFF,
  FIELD_STAFF_OBJECT,
  GOMEDDO_KEY,
  RESOURCE_COUNTRY_ID,
} from "./constants";
import { useFilterContext } from "./filterContext";

// Custom hook to initialize and memoize the GoMeddo instance
export function useGomeddo() {
  return useMemo(() => {
    return new GoMeddo(GOMEDDO_KEY); // Initialize GoMeddo with the provided API key
  }, []);
}

// Custom hook to fetch dentist resources and their associated rooms
export function useDentistResources() {
  const gomeddo = useGomeddo(); // Get the GoMeddo instance

  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [dentists, setDentists] = useState([]); // State to hold dentist resources
  const [rooms, setRooms] = useState([]); // State to hold room resources

  useEffect(() => {
    // Function to fetch dentist and room resources
    const trigger = async () => {
      setIsLoading(true); // Set loading state to true

      try {
        const results = await gomeddo
          .buildResourceRequest()
          .includeAllResourcesAt(RESOURCE_COUNTRY_ID) // Include resources at a specific location
          .includeAdditionalField([
            FIELD_RESOURCE_CITY,
            FIELD_RESOURCE_IMG,
            FIELD_RESOURCE_DEFAULT_PRICE,
          ])
          .getResults();

        const resourceIds = results.getResourceIds(); // Get all resource IDs
        const resources = resourceIds.map((id) => results.getResource(id)); // Get resources by ID
        const cityResources = resources.filter(
          (resource) => resource.parentId === RESOURCE_COUNTRY_ID
        ); // Filter city resources
        const dentistResources = cityResources.flatMap((city) =>
          resources.filter((resource) => resource.parentId === city.id)
        ); // Get dentist resources within city resources
        const roomResources = dentistResources.flatMap((dentist) =>
          resources.filter((resource) => resource.parentId === dentist.id)
        ); // Get room resources within dentist resources

        setDentists(dentistResources); // Set dentist resources state
        setRooms(roomResources); // Set room resources state
      } catch (error) {
        console.error("Error fetching dentists:", error); // Log error if any
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    trigger(); // Trigger the fetching function
  }, [gomeddo]);

  return {
    isLoading,
    dentists,
    rooms,
  };
}

// Custom hook to fetch staff resources
export function useStaffResources() {
  const gomeddo = useGomeddo(); // Get the GoMeddo instance

  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [staff, setStaff] = useState([]); // State to hold staff resources

  useEffect(() => {
    // Function to fetch staff resources
    const trigger = async () => {
      try {
        setIsLoading(true);
        setStaff([]);

        const results = await gomeddo
          .buildDimensionRecordRequest(FIELD_STAFF_OBJECT) // Request staff records
          .getResults();

        const objectIds = results.getObjectIds(); // Get all object IDs
        const records = objectIds.map((id) => results.getDimensionRecord(id)); // Get records by ID

        setStaff(records); // Set staff resources state
      } catch (error) {
        console.error(error); // Log error if any
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    trigger(); // Trigger the fetching function
  }, [gomeddo]);

  // Extract staffIds from staff resources
  const staffIds = useMemo(() => staff.map((staff) => staff.id), [staff]);
  return {
    isLoading,
    staffIds,
    staff,
  };
}

// Custom hook to fetch room reservation resources
export function useRoomReservationResources(roomIds, staffIds) {
  const gomeddo = useGomeddo(); // Get the GoMeddo instance

  const [isLoading, setIsLoading] = useState(true); // State for loading status
  const [reservations, setReservations] = useState([]); // State to hold reservation resources

  const { date } = useFilterContext();

  useEffect(() => {
    if (!roomIds.length || !staffIds.length) return; // Return if no room IDs or staff IDs are provided

    // Function to fetch room reservation resources
    const trigger = async () => {
      try {
        setIsLoading(true); // Set loading state to true
        setReservations([]);

        const start = new Date(date);
        const end = new Date(start);

        start.setHours(6, 0, 0, 0);
        end.setHours(24, 0, 0, 0);

        const timeSlots = await gomeddo
          .buildTimeSlotsRequest(start, end) // Request time slots for the given date range
          .withField(FIELD_STAFF_OBJECT, staffIds) // Filter by staff IDs
          .withField(FIELD_RESOURCE_OBJECT, roomIds) // Filter by room IDs
          .withDuration(30) // Set duration for time slots
          .getResults();

        const reservations = timeSlots
          .getTimeSlots()
          .flatMap((timeSlot) => timeSlot.getReservations()); // Get reservations from time slots

        setReservations(reservations); // Set reservation resources state
      } catch (error) {
        console.error(error); // Log error if any
      } finally {
        setIsLoading(false); // Set loading state to false
      }
    };

    trigger(); // Trigger the fetching function
  }, [gomeddo, date, roomIds, staffIds]);

  return {
    isLoading,
    reservations,
  };
}

export function useReservationResource(id) {
  const gomeddo = useGomeddo();

  const [reservation, setReservation] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const trigger = async () => {
      try {
        setIsLoading(true);

        const result = await gomeddo
          .buildReservationRequest()
          .includeAdditionalFields([
            FIELD_RESOURCE_OBJECT,
            FIELD_RESOURCE_STAFF,
            FIELD_RESERVATION_RESOURCE_NAME,
            FIELD_RESERVATION_START_TIME,
            FIELD_RESERVATION_END_TIME,
            FIELD_RESERVATION_TOTAL_COST,
            FIELD_RESERVATION_DURATION,
          ])
          .withIds(id)
          .getResults();

        setReservation(result.getReservation(id));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    trigger();
  }, [id, gomeddo]);

  return { reservation, isLoading };
}
