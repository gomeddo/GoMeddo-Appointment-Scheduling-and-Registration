import { Link } from "react-router-dom";
import { ArrowRight } from "react-feather";
import Button from "../../components/button";
import { useState } from "react";

function formatDate(date) {
  return new Date(date).toLocaleString("en-US", {
    timeZone: "America/New_York",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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
  const [showMore, setShowMore] = useState(false);

  const timeSlots = rooms
    .flatMap((room) => room.timeSlots)
    .reduce((unique, timeSlot) => {
      const roomId = timeSlot.roomId;
      const start = new Date(timeSlot.start);
      const end = new Date(timeSlot.end);

      const existing = unique.find(
        (timeSlot) =>
          timeSlot.start.getTime() === start.getTime() &&
          timeSlot.end.getTime() === end.getTime()
      );

      if (!!existing) {
        existing.roomIds.push(roomId);
      } else {
        unique.push({
          start: start,
          end: end,
          roomIds: [roomId],
        });
      }

      return unique;
    }, []);

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
        {timeSlots.slice(0, !showMore ? 3 : undefined).map((timeSlot, i) => (
          <Button
            key={i}
            active={i === selectedTimeSlot}
            onClick={() =>
              setSelectedTimeSlot((state) => (state !== i ? i : undefined))
            }
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
          <Link
            to={`/dentist/${id}?start=${timeSlots[
              selectedTimeSlot
            ].start.getTime()}&end=${timeSlots[
              selectedTimeSlot
            ].end.getTime()}&roomIds=${timeSlots[selectedTimeSlot].roomIds}`}
            className="ms-auto hover:scale-105 transition-all"
          >
            <ArrowRight className="size-10" />
          </Link>
        )}
      </div>
    </div>
  );
}
