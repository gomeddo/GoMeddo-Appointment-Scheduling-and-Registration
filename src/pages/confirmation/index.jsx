import Sample1 from "../../assets/sample_1.png";

export default function ConfirmationPage() {
  return (
    <div className="p-16 bg-white mx-16 px-16 py-8 rounded-lg gap-12">
      <div className="flex gap-2 pb-10">
        <div className="relative grid select-none items-center whitespace-nowrap rounded-full bg-green-500 py-1.5 px-3 font-sans text-xs font-bold uppercase text-white">
          <span className="">Confirmed</span>
        </div>
        <div className="font-bold">Sun 16 July 2023 at 5:00pm</div>
      </div>
      <div className="grid grid-cols-[55%_45%] gap-4 pb-16">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <img src={Sample1} />
          </div>
          <div>
            <div className="font-bold text-2xl pb-2">
              Bright Smiles Amsterdam
            </div>
            <div className="font-medium pb-4">Amsterdam suid, 256781u892</div>
            <div className="font-medium">Good 7.2</div>
          </div>
        </div>
        <div>
          <div className="rounded-lg border border-black/opacity-20 p-5 text-blue-dark mb-6">
            <div className="flex justify-between font-medium text-2xl py-4">
              <div>Dentist Appointment w/ Dr John</div>
              <div className="font-normal">1h</div>
            </div>
            <hr class="border-t border-black opacity-20 my-4 pb-4"/>
            <div className="flex justify-between">
              <div className="font-medium">Taxes</div>
              <div>EUR 0</div>
            </div>
            <div className="flex justify-between">
              <div className="font-medium">Total</div>
              <div>EUR 230</div>
            </div>
          </div>

          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Back To Dashboard
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="font-bold">Cancellation Policy</div>
        <div>
          Cancel for free anytime in advance, otherwise you will be charged
          <span className="font-medium"> 100%</span> of the service price for
          not showing up.
        </div>
      </div>
    </div>
  );
}
