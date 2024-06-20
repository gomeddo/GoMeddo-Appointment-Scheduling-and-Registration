import SampleImage from "../../assets/sample_1.png";

export default function AppointmentPage() {
  return (
    <div className="w-full min-h-screen p-12 px-64">
      <h2 className="text-3xl font-semibold">Make an appointment</h2>

      <hr className="my-8 bg-blue-900 h-0.5"></hr>

      <div className="flex flex-row">
        <div className="w-64">
          <div className="inline-block bg-black rounded-3xl w-[14rem] h-[22rem]">
            <img
              src={SampleImage}
              alt="Dentist Logo"
              className="ml-8 mt-8 rounded-3xl w-[14rem] h-[22rem] object-cover"
            />
          </div>
        </div>

        <div className="grow ml-24 -mt-4">
          <div class="grid grid-cols-2 gap-2 gap-y-0">
            <div class="p-4">
              <label for="first_name" class="block">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                class="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
              ></input>
            </div>

            <div class="p-4">
              <label for="last_name" class="block">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                class="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
              ></input>
            </div>

            <div class="p-4">
              <label for="phone" class="block">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="(06) 000-0000"
                class="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
              ></input>
            </div>

            <div class="p-4">
              <label for="email" class="block">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                class="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
              ></input>
            </div>
          </div>

          <div class="">
            <div class="p-4">
              <h3 class="text-lg mb-2">Message</h3>
              <textarea
                placeholder="Include a message.."
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

            <div class="p-4 flex justify-between">
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
