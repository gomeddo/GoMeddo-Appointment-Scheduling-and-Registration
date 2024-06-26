import { Link } from "react-router-dom";
import { ArrowRight } from "react-feather";
import Button from "../../components/button";
import { useState } from "react";

const timeSlots = Array.from(Array(4).keys()).map((i) => {
  const start = new Date();
  start.setHours(9 + i * 2, 0, 0, 0);
  const end = new Date(start);
  end.setHours(11 + i * 2, 0, 0, 0);

  return {
    id: i,
    start: start,
    end: end,
  };
});

export default function DentistCard({
  id,
  name,
  city,
  address,
  ratingType,
  rating,
  imageUrl,
  rooms,
}) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();

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
        {timeSlots.map((timeSlot) => (
          <Button
            key={timeSlot.id}
            active={timeSlot.id === selectedTimeSlot}
            onClick={() =>
              setSelectedTimeSlot((state) =>
                state !== timeSlot.id ? timeSlot.id : undefined
              )
            }
          >
            {timeSlot.start.toLocaleTimeString([], { hour: "numeric" })} -{" "}
            {timeSlot.end.toLocaleTimeString([], { hour: "numeric" })}
          </Button>
        ))}
        <div className="font-bold text-center">show more...</div>
        {selectedTimeSlot != null && (
          <Link
            to={`/dentist/${id}?timeSlot=${selectedTimeSlot}`}
            className="ms-auto hover:scale-105 transition-all"
          >
            <ArrowRight className="size-10" />
          </Link>
        )}
      </div>
    </div>
  );
}
