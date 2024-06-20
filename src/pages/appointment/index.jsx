import SampleImage from "../../assets/booking.png";

function FormItem(props) {
  return (
    <div class="p-4">
      <label for={props.id} class="block">
        {props.label}
      </label>
      <input
        type={props.type}
        id={props.id}
        name={props.id}
        placeholder={props.label}
        class="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <div className="w-full min-h-screen pt-12">
      <div className="md:max-w-screen-lg	mx-auto">
        <h2 className="text-3xl font-semibold">Make an appointment</h2>

        <hr className="my-8 bg-blue-900 h-0.5"></hr>

        <div className="flex flex-row">
          <div className="w-64">
            <div className="inline-block bg-black rounded-3xl w-[14rem] h-[22rem]">
              <img
                src={SampleImage}
                alt="Dentist Logo"
                className="ml-6 mt-6 rounded-3xl w-[14rem] h-[22rem] object-cover"
              />
            </div>
          </div>

          <div className="grow ml-24 -mt-4">
            <div class="grid grid-cols-2 gap-2 gap-y-0">
              <FormItem label="First Name" type="text" id="first_name" />
              <FormItem label="Last Name" type="text" id="last_name" />
              <FormItem label="Phone" type="tel" id="phone" />
              <FormItem label="Email" type="email" id="email" />
            </div>

            <div class="">
              <div class="p-4">
                <label for="message" class="block">
                  Message
                </label>
                <textarea
                  placeholder="Include a message.."
                  id="message"
                  class="w-full min-h-24 px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
                ></textarea>
              </div>

              <div class="p-4 flex items-center">
                <input
                  type="checkbox"
                  class="h-5 w-5 mr-2 text-green-500"
                ></input>
                <p>You agree with our friendly privacy policy</p>
              </div>
            </div>

            <div class="px-8 mt-8 flex justify-between">
              <button class="px-16 py-2 outline rounded-sm hover:bg-gray-100">
                Cancel
              </button>
              <button class="px-16 py-2 outline rounded-sm hover:bg-gray-100">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
