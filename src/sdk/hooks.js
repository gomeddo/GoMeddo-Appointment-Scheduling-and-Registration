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
  const [reservations, setReservations] = useState([]);

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

          staffResults = Array.from(staffResponse.objectById.values()).map(
            (staff) => ({
              id: staff.id,
              name: staff.name,
            })
          );

          const ids = staffResults.map((staff) => staff.id);
          setStaffIds(ids);
        } catch (error) {
          console.error("Error fetching staff:", error);
        }
        console.log(staffIds);

        const start = new Date();
        start.setHours(6, 0, 0, 0);

        const staffIdss = [
          "a0ebn000001r5fKAAQ",
          "a0ebn000001r5x5AAA",
          "a0ebn000001r6oIAAQ",
          "a0ebn000001r7GVAAY",
          "a0ebn000001r8IDAAY",
          "a0ebn000001r8JrAAI",
          "a0ebn000001r8q5AAA",
          "a0ebn000001r9z3AAA",
          "a0ebn000001rAS5AAM",
          "a0ebn000001rAWvAAM",
          "a0ebn000001rAdNAAU",
        ];

        const end = new Date(start);
        end.setHours(25, 0, 0, 0);
        const timeSlots = await gomeddo
          .buildTimeSlotsRequest(start, end)
          // .withField("B25__Staff__c", staffIds)
          .withField(
            "B25__Resource__c",
            roomResources.map((resource) => resource.id)
          )
          .withDuration(30)
          .getResults();

        const roomTimes = timeSlots.getTimeSlots().flatMap((timeSlot) =>
          timeSlot.getReservations().map((reservation) => ({
            id: reservation.id, // Store reservation ID
            roomId: reservation.getCustomProperty("B25__Resource__c"),
            start: timeSlot.startOfSlot,
            end: timeSlot.endOfSlot,
            staffId: reservation.setCustomProperty("B25__Staff__c", staffIdss),
          }))
        );

        setReservations(roomTimes); // Store reservations
        console.log(timeSlots);
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
            staff: dentist.getCustomProperty("B25__Staff__c"),
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

  return { isLoading, dentists, staffIds, reservations };
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
        // staff: dentist.getCustomProperty("B25__Staff__c"),
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

// export function useReservation(id, reservations = []) {
//   const [isLoading, setIsLoading] = useState(true);
//   const [reservation, setReservation] = useState(undefined);

//   useEffect(() => {
//     setIsLoading(true);

//     // find the reservation in the array by id
//     const reservationData = reservations.find(res => res.id === id);

//     // update the reservation state
//     setReservation(reservationData);
//     setIsLoading(false);
//   }, [id, reservations]);

//   return { isLoading, reservation };
// }