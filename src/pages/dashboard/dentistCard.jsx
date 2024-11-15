import React, { useState } from "react";
import { ArrowRight } from "react-feather"; // Importing ArrowRight icon from react-feather
import { useNavigate } from "react-router-dom"; // Importing hook for programmatic navigation
import Button from "../../components/button"; // Importing Button component
import Skeleton from "../../components/skeleton"; // Importing Skeleton component
import SampleImage from "../../assets/Sample_Room1.jpeg"; // Import sample image
import {
  BUTTON_SHOW_LESS,
  BUTTON_SHOW_MORE,
  FIELD_RESOURCE_CITY,
  FIELD_RESOURCE_DEFAULT_PRICE,
  FIELD_RESOURCE_IMG,
  LABEL_PRICE_PER_APPOINTMENT,
  MESSAGE_NO_TIME_SLOTS_AVAILABLE,
} from "../../sdk/constants"; // Importing constants from SDK
import { useStateContext } from "../../sdk/stateContext"; // Importing custom hook from SDK

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

  // Extracting details from the provided dentist resource
  const name = dentistResource.name;
  const city = dentistResource.getCustomProperty(FIELD_RESOURCE_CITY);
  const price = dentistResource.getCustomProperty(FIELD_RESOURCE_DEFAULT_PRICE);
  const imageUrl = dentistResource.getCustomProperty(FIELD_RESOURCE_IMG);

  // Grouping reservations by unique time slots
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

  const { setSelectedDentist, setSelectedReservation } = useStateContext(); // Accessing context to set selected reservation

  return (
    <div className="rounded-lg ring-1 ring-gray-300 p-8 text-blue-dark grid md:grid-cols-2 gap-8">
      {(!imageUrl ) && (
        <img src={SampleImage} className="rounded-lg" />
      )}
      {(imageUrl) && (
        <img src={imageUrl} className="w-full rounded-lg" />
      )}{" "}
      {/* Displaying dentist image */}
      <div className="flex flex-col gap-4">
        <div>
          <div className="text-2xl font-medium">{name} - {city}</div>{" "}
          {/* Displaying dentist name */}
          <div className="text-sm py-4 flex flex-col gap-2">
            <span className="font-medium">
              {LABEL_PRICE_PER_APPOINTMENT} ${price}
            </span>
            {/* Displaying dentist price */}
          </div>
        </div>
        {/* Displaying loading skeletons while reservations are loading */}
        {reservationsLoading &&
          Array.from(Array(3).keys()).map((i) => (
            <Skeleton key={i} className="h-10" />
          ))}
        {/* Displaying message when no time slots are available */}
        {timeSlots.length === 0 && !reservationsLoading && (
          <div className="text-center text-red-500 text-lg font-bold">
            {MESSAGE_NO_TIME_SLOTS_AVAILABLE}
          </div>
        )}
        {/* Mapping and displaying time slots */}
        {timeSlots.slice(0, !showMore ? 3 : undefined).map((timeSlot, i) => (
          <Button
            key={i}
            active={selectedTimeSlot === i}
            onClick={() => setSelectedTimeSlot(i)}
          >
            {formatDate(timeSlot.start)} - {formatDate(timeSlot.end)}{" "}
            {/* Displaying time slot */}
          </Button>
        ))}
        {/* Button to toggle showing more/less time slots */}
        {timeSlots.length > 3 && (
          <Button
            className="!font-bold !ring-0"
            onClick={() => setShowMore((state) => !state)}
          >
            {showMore ? BUTTON_SHOW_LESS : BUTTON_SHOW_MORE}
            {/* Toggle show more/less time slots */}
          </Button>
        )}
        {/* Arrow icon to navigate to dentist details page */}
        {selectedTimeSlot != null && (
          <ArrowRight
            className="ms-auto hover:scale-105 transition-all size-10 cursor-pointer"
            onClick={() => {
              setSelectedDentist(dentistResource);
              setSelectedReservation(
                timeSlots[selectedTimeSlot].reservations[0]
              ); // Setting selected reservation in context
              navigate("/dentist"); // Navigating to dentist details page
            }}
          />
        )}
      </div>
    </div>
  );
}
