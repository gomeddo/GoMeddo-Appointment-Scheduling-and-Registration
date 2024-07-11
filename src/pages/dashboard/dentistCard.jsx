import { useState } from "react";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button";
import Skeleton from "../../components/skeleton";
import { useStateContext } from "../../sdk/stateContext";

// Function to format date into a readable string
function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Component to display a dentist card with reservation information
export default function DentistCard({
  dentistResource,
  roomResources,
  reservationResources,
  reservationsLoading,
}) {
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Extract dentist details from the provided resource
  const id = dentistResource.id;
  const name = dentistResource.name;
  const city = dentistResource.getCustomProperty("Dentist_City__c");
  const address = dentistResource.getCustomProperty("Dentist_Location__c");
  const rating = dentistResource.getCustomProperty("Dentist_Rating__c");
  const price = dentistResource.getCustomProperty("B25__Default_Price__c");
  const imageUrl = dentistResource.getCustomProperty("B25__Image_Url__c");
  const ratingType = "Excellent";

  // Group reservations by unique time slots
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

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(); // State to track selected time slot
  const [showMore, setShowMore] = useState(false); // State to toggle showing more/less time slots

  const { setSelectedReservation } = useStateContext(); // Access context to set selected reservation

  return (
    <div className="rounded-lg ring-1 ring-gray-300 p-8 text-blue-dark grid md:grid-cols-2 gap-8">
      <img src={imageUrl} className="w-full rounded-lg" />{" "}
      {/* Display dentist image */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-2xl font-medium">{name}</div>{" "}
          {/* Display dentist name */}
          <div>{address}</div> {/* Display dentist address */}
          <div className="text-sm py-4 flex gap-2">
            <span className="font-bold">${price}</span>
            {/* Display dentist price */}
            <span>{ratingType}</span>
            <span className="font-medium">{rating}</span>
            {/* Display dentist rating */}
          </div>
          <div className="text-sm py-4 flex">
            <span className="font-bold">${price}</span>
            {/* Display dentist rating */}
          </div>
        </div>
        {reservationsLoading &&
          Array.from(Array(3).keys()).map((i) => (
            <Skeleton key={i} className="h-10" /> // Display loading skeletons while reservations are loading
          ))}
        {timeSlots.length === 0 && !reservationsLoading && (
          <div className="text-center text-red-500 text-lg font-bold">
            No available time slots currently
          </div>
        )}
        {timeSlots.slice(0, !showMore ? 3 : undefined).map((timeSlot, i) => (
          <Button
            key={i}
            active={selectedTimeSlot === i}
            onClick={() => setSelectedTimeSlot(i)}
          >
            {formatDate(timeSlot.start)} - {formatDate(timeSlot.end)}{" "}
            {/* Display time slots */}
          </Button>
        ))}
        {timeSlots.length > 3 && (
          <Button
            className="!font-bold !ring-0"
            onClick={() => setShowMore((state) => !state)}
          >
            {showMore ? "show less..." : "show more..."}{" "}
            {/* Toggle show more/less time slots */}
          </Button>
        )}
        {selectedTimeSlot != null && (
          <ArrowRight
            className="ms-auto hover:scale-105 transition-all size-10 cursor-pointer"
            onClick={() => {
              setSelectedReservation(
                timeSlots[selectedTimeSlot].reservations[0]
              ); // Set selected reservation in context
              navigate("/dentist"); // Navigate to dentist details page
            }}
          />
        )}
      </div>
    </div>
  );
}
