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
  const [dentists, setDentists] = useState(undefined);

  useEffect(() => {
    const trigger = async () => {
      setIsLoading(true);

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

      const start = new Date();
      start.setHours(9, 0, 0, 0);
      const end = new Date(start);
      end.setHours(17, 0, 0, 0);

      const timeSlots = await gomeddo
        .buildTimeSlotsRequest(start, end)
        .withField(
          "B25__Resource__c",
          roomResources.map((resource) => resource.id)
        )
        .withDuration(120)
        .getResults();

      const roomTimes = timeSlots.getTimeSlots().flatMap((timeSlot) =>
        timeSlot.getReservations().map((reservation) => ({
          roomId: reservation.getCustomProperty("B25__Resource__c"),
          start: timeSlot.startOfSlot,
          end: timeSlot.endOfSlot,
        }))
      );

      const dentists = dentistResources.map((dentist) => ({
        id: dentist.id,
        name: dentist.name,
        city: dentist.getCustomProperty("Dentist_City__c"),
        address: dentist.getCustomProperty("Dentist_Location__c"),
        rating: dentist.getCustomProperty("Dentist_Rating__c"),
        ratingType: "Excellent",
        price: dentist.getCustomProperty("B25__Default_Price__c"),
        imageUrl: dentist.getCustomProperty("B25__Image_Url__c"),
        rooms: roomResources
          .filter((room) => room.parentId === dentist.id)
          .map((room) => ({
            id: room.id,
            name: room.name,
            timeSlots: roomTimes.filter(
              (roomTime) => roomTime.roomId === room.id
            ),
          })),
      }));

      setDentists(dentists);
      setIsLoading(false);
    };

    trigger();
  }, [gomeddo]);

  return { isLoading, dentists };
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
