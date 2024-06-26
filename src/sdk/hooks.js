import { useEffect, useState } from "react";
import { useGomeddoContext } from "./gomeddoContext";

const mockAppointments = Array.from(Array(10).keys()).map((i) => ({
  id: i,
  city: "Bright Smiles New York",
  address: "Stoltenberg Island, West Kieth, DE 97885-0768",
  ratingType: "Excellent",
  rating: 9.2,
}));

export function useAppointments() {
  const { gomeddo } = useGomeddoContext();

  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState(undefined);

  useEffect(() => {
    const trigger = async () => {
      setIsLoading(true);

      await new Promise((res) => {
        setTimeout(() => res(), 2_000);
      });

      setAppointments(mockAppointments);
      setIsLoading(false);
    };

    trigger();
  }, []);

  return { isLoading, appointments };
}

export function useAppointment(id) {
  const { gomeddo } = useGomeddoContext();

  const [isLoading, setIsLoading] = useState(true);
  const [appointment, setAppointment] = useState(undefined);

  useEffect(() => {
    const trigger = async () => {
      setAppointments(undefined);
      setIsLoading(true);

      await new Promise((res) => {
        setTimeout(() => res(), 2_000);
      });

      setIsLoading(false);
    };

    trigger();
  }, [id]);

  return { isLoading, appointment };
}

export function useReservation(id) {
  const { gomeddo } = useGomeddoContext();

  const [isLoading, setIsLoading] = useState(true);
  const [reservation, setReservation] = useState(undefined);

  useEffect(() => {
    const trigger = async () => {
      setReservation(undefined);
      setIsLoading(true);

      await new Promise((res) => {
        setTimeout(() => res(), 2_000);
      });

      setIsLoading(false);
    };

    trigger();
  }, [id]);

  return { isLoading, reservation };
}
