import { useNavigate, useParams } from "react-router-dom";
import SampleImage from "../../assets/booking.png";
import { CheckCircle } from "react-feather";
import { useReservationResource } from "../../sdk/hooks";

export default function ConfirmationPage() {
  const { id } = useParams();

  const { isLoading, reservation } = useReservationResource(id);

  const navigate = useNavigate();

  const handleBackToDashboard = () => {
    navigate("/");
  };

  if (isLoading || !reservation) {
    return (
      <div className="flex flex-col items-center justify-center h-full pt-40">
        <div className="w-24 h-24 border-8 border-black border-dashed rounded-full animate-spin"></div>
        <p className="mt-4 text-xl font-semibold text-black">
          Loading...
        </p>
      </div>
    );
  }

  const staff = reservation.getCustomProperty("Dentist_Staff__c");
  const roomName = reservation.getCustomProperty("B25__ResourceName__c");
  const start = new Date(reservation.getCustomProperty("B25__Start__c"));
  const end = new Date(reservation.getCustomProperty("B25__End__c"));
  const cost = reservation.getCustomProperty("B25__Total_Price__c");
  const duration = reservation.getCustomProperty("Duration_in_Hours__c");
  const rating = reservation.getCustomProperty("Dentist_Rating__c");

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <div className="items-center rounded-full bg-green-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
          <CheckCircle className="size-3 inline-block me-1" />
          Confirmed
        </div>
        <div className="font-bold">
          Appointment Made For: {start.toLocaleString()}
        </div>
      </div>
      <hr className="bg-gray-300 h-0.5" />
      <div className="flex flex-row gap-16">
        <div className="flex flex-col gap-16">
          <div className="relative">
            <div className="bg-black rounded-3xl w-[14rem] h-[22rem] me-8 mb-8" />
            <img
              src={SampleImage}
              alt="Dentist Logo"
              className="absolute top-8 left-8 rounded-3xl w-[14rem] h-[22rem] object-cover"
            />
          </div>
          <div className="w-[16rem]">
            <div className="font-bold">Cancellation Policy</div>
            <div>
              Cancel for free anytime in advance, otherwise you will be charged
              <span className="font-medium"> 100%</span> of the service price
              for not showing up.
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-8 flex-1">
          <div>
            <div className="font-bold text-2xl">{roomName}</div>
            <div className="font-medium">5678 West Sunset Boulevard, Los Angeles, CA 90028</div>
            <div className="font-medium">Clinic Rating: {rating}</div>
          </div>
          <div className="rounded-lg border border-gray-300 p-5 text-blue-dark max-w-3xl">
            <div className="flex justify-between font-medium text-2xl py-4">
              <div>Dentist Appointment w/ {staff}</div>
              <div className="font-normal">{duration}h</div>
            </div>
            <hr className="border-t border-black opacity-20 my-4 pb-4" />
            <div className="flex justify-between">
              <div className="font-medium">Total</div>
              <div>USD: ${cost}</div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleBackToDashboard}
              className="bg-blue-dark hover:bg-blue-hover text-white font-bold py-2 px-4 rounded"
            >
              Back To Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
