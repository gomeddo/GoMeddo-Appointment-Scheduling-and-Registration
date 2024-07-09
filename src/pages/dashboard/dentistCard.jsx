import { useState } from "react";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Skeleton from "../../components/skeleton";
import { useStateContext } from "../../sdk/stateContext";

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DentistCard({
  dentistResource,
  roomResources,
  reservationResources,
  reservationsLoading,
}) {
  const navigate = useNavigate();

  const id = dentistResource.id;
  const name = dentistResource.name;
  const city = dentistResource.getCustomProperty("Dentist_City__c");
  const address = dentistResource.getCustomProperty("Dentist_Location__c");
  const rating = dentistResource.getCustomProperty("Dentist_Rating__c");
  const price = dentistResource.getCustomProperty("B25__Default_Price__c");
  const imageUrl = dentistResource.getCustomProperty("B25__Image_Url__c");
  const ratingType = "Excellent";

  const timeSlots = reservationResources.reduce((unique, timeSlot) => {
    const start = timeSlot.startDatetime;
    const end = timeSlot.endDatetime;

    const existing = unique.find(
      (timeSlot) =>
        timeSlot.start.getTime() === start.getTime() &&
        timeSlot.end.getTime() === end.getTime()
    );

    if (!!existing) {
      existing.reservations.push(timeSlot);
    } else {
      unique.push({
        start: start,
        end: end,
        reservations: [timeSlot],
      });
    }

    return unique;
  }, []);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [showMore, setShowMore] = useState(false);

  const { setSelectedReservation } = useStateContext();

  return (
    <div className="rounded-lg ring-1 ring-gray-300 p-8 text-blue-dark grid md:grid-cols-2 gap-8">
      <img src={imageUrl} className="w-full rounded-lg" />
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-2xl font-medium">{name}</div>
          <div>{address}</div>
          <div className="text-sm py-4">
            {ratingType} <span className="font-medium">{rating}</span>
          </div>
        </div>
        {reservationsLoading &&
          Array.from(Array(3).keys()).map((i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        {timeSlots.slice(0, !showMore ? 3 : undefined).map((timeSlot, i) => (
          <Button
            key={i}
            active={selectedTimeSlot === i}
            onClick={() => setSelectedTimeSlot(i)}
          >
            {formatDate(timeSlot.start)} - {formatDate(timeSlot.end)}
          </Button>
        ))}
        {timeSlots.length > 3 && (
          <Button
            className="!font-bold !ring-0"
            onClick={() => setShowMore((state) => !state)}
          >
            {showMore ? "show less..." : "show more..."}
          </Button>
        )}
        {selectedTimeSlot != null && (
          <ArrowRight
            className="ms-auto hover:scale-105 transition-all size-10 cursor-pointer"
            onClick={() => {
              setSelectedReservation(
                timeSlots[selectedTimeSlot].reservations[0]
              );
              navigate("/dentist");
            }}
          />
        )}
      </div>
    </div>
  );
}
