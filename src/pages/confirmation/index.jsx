import { useNavigate, useParams } from "react-router-dom";
import SampleImage from "../../assets/booking.png";
import { CheckCircle } from "react-feather";
import { useReservation } from "../../sdk/hooks";

export default function ConfirmationPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, reservation } = useReservation(id);

  const handleBackToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2 items-center">
        <div className="items-center rounded-full bg-green-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
          <CheckCircle className="size-3 inline-block me-1" />
          Confirmed
        </div>
        <div className="font-bold">Sun 16 July 2023 at 5:00pm</div>
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
            <div className="font-bold text-2xl">Bright Smiles Amsterdam</div>
            <div className="font-medium">Amsterdam suid, 256781u892</div>
            <div className="font-medium">Good 7.2</div>
          </div>
          <div className="rounded-lg border border-gray-300 p-5 text-blue-dark max-w-3xl">
            <div className="flex justify-between font-medium text-2xl py-4">
              <div>Dentist Appointment w/ Dr John</div>
              <div className="font-normal">1h</div>
            </div>
            <hr className="border-t border-black opacity-20 my-4 pb-4" />
            <div className="flex justify-between">
              <div className="font-medium">Taxes</div>
              <div>EUR €: 0</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Total</div>
              <div>EUR €: 230</div>
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
