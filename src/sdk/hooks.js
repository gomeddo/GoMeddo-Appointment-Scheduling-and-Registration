import { useEffect, useMemo, useState } from "react";
import GoMeddo from "@gomeddo/sdk";

export function useGomeddo() {
  return useMemo(() => {
    return new GoMeddo(import.meta.env.VITE_GOMEDDO_KEY);
  }, []);
}

export function useDentists() {
  const gomeddo = useGomeddo();

  const [isLoading, setIsLoading] = useState(true);
  const [dentists, setDentists] = useState([]);
  const [staffIds, setStaffIds] = useState([]);

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

        let staffResults = [];

        try {
          const staffResponse = await gomeddo
            .buildDimensionRecordRequest("B25__Staff__c")
            .getResults();

          // Extracting staff data from DimensionRecordResult
          staffResults = Array.from(staffResponse.objectById.values()).map((staff) => ({
            id: staff.id,
            name: staff.name, // adjust accordingly to match the structure of staff object
          }));

          console.log("Staff Results:", staffResults);

          const ids = staffResults.map((staff) => staff.id);
          setStaffIds(ids);
          console.log(ids);
        } catch (error) {
          console.error("Error fetching staff:", error);
        }

        const start = new Date();
        start.setHours(6, 0, 0, 0);

        const end = new Date(start);
        end.setHours(24, 0, 0, 0);
        const timeSlots = await gomeddo
          .buildTimeSlotsRequest(start, end)
          .withField(
            "B25__Resource__c",
            roomResources.map((resource) => resource.id)
          )
          .withDuration(30)
          .getResults();
        console.log("Time Slots:", timeSlots);
        const roomTimes = timeSlots.getTimeSlots().flatMap((timeSlot) =>
          timeSlot.getReservations().map((reservation) => ({
            roomId: reservation.getCustomProperty("B25__Resource__c"),
            start: timeSlot.startOfSlot,
            end: timeSlot.endOfSlot,
            staff: reservation.setCustomProperty("B25__Staff__c", staffIds),
            /*start: new Date(timeSlot.startOfSlot).toLocaleString("en-US", {
              timeZone: "America/New_York",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            end: new Date(timeSlot.endOfSlot).toLocaleString("en-US", {
              timeZone: "America/New_York",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),*/
          }))
        );

        const dentistsData = dentistResources.map((dentist) => {
          const rooms = roomResources
            .filter((room) => room.parentId === dentist.id)
            .map((room) => ({
              id: room.id,
              name: room.name,
              timeSlots: roomTimes.filter(
                (roomTime) => roomTime.roomId === room.id
              ),
            }));

          return {
            id: dentist.id,
            name: dentist.name,
            city: dentist.getCustomProperty("Dentist_City__c"),
            address: dentist.getCustomProperty("Dentist_Location__c"),
            rating: dentist.getCustomProperty("Dentist_Rating__c"),
            ratingType: "Excellent",
            price: dentist.getCustomProperty("B25__Default_Price__c"),
            imageUrl: dentist.getCustomProperty("B25__Image_Url__c"),
            rooms: rooms,
          };
        });

        setDentists(dentistsData);
      } catch (error) {
        console.error("Error fetching dentists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    trigger();
  }, [gomeddo]);

  return { isLoading, dentists, staffIds };
}

export function useDentist(id) {
  const gomeddo = useGomeddo();

  const [isLoading, setIsLoading] = useState(true);
  const [dentist, setDentist] = useState(undefined);

  useEffect(() => {
    const trigger = async () => {
      setIsLoading(true);

      const results = await gomeddo
        .buildResourceRequest()
        .includeAllResourcesAt(id)
        .includeAdditionalField([
          "Dentist_City__c",
          "Dentist_Location__c",
          "Dentist_Rating__c",
          "B25__Image_Url__c",
          "B25__Default_Price__c",
        ])
        .getResults();

      const dentist = results.getResource(id);
      const resourceIds = results.getResourceIds();
      const resources = resourceIds.map((id) => results.getResource(id));

      setDentist({
        id: dentist.id,
        name: dentist.name,
        city: dentist.getCustomProperty("Dentist_City__c"),
        address: dentist.getCustomProperty("Dentist_Location__c"),
        rating: dentist.getCustomProperty("Dentist_Rating__c"),
        ratingType: "Excellent",
        price: dentist.getCustomProperty("B25__Default_Price__c"),
        imageUrl: dentist.getCustomProperty("B25__Image_Url__c"),
        rooms: resources
          .filter((room) => room.parentId === dentist.id)
          .map((room) => ({
            id: room.id,
            name: room.name,
          })),
      });

      setIsLoading(false);
    };

    trigger();
  }, [id, gomeddo]);

  return { isLoading, dentist };
}

export function useReservation(id) {
  const gomeddo = useGomeddo();

  const [isLoading, setIsLoading] = useState(true);
  const [reservation, setReservation] = useState(undefined);

  useEffect(() => {
    const trigger = async () => {
      setIsLoading(true);

      try {
        const reservation = (
          await gomeddo
            .buildReservationRequest()
            .withIds(id)
            .includeAdditionalFields([
              "B25__Total_Price__c",
              "B25__Resource__c",
              "B25__Start_Date__c",
              "B25__End_Date__c",
              "Duration_in_Hours__c",
              "B25__Base_Price__c",
              "B25__Reservation_Type__c",
            ])
            .getResults()
        ).getReservation(id);

        setReservation({
          id: reservation.id,
          start: reservation.getCustomProperty("B25__Start_Date__c"),
          end: reservation.getCustomProperty("B25__End_Date__c"),
          duration: reservation.getCustomProperty("Duration_in_Hours__c"),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    trigger();
  }, [id, gomeddo]);

  return { isLoading, reservation };
}
