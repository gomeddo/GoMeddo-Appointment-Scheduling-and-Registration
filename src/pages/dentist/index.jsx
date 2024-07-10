import { forwardRef, useRef, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SampleImage from "../../assets/booking.png";
import Button from "../../components/button";
import { useStateContext } from "../../sdk/stateContext";
import { useGomeddo } from "../../sdk/hooks";
import { Contact, Reservation } from "@gomeddo/sdk";

const FormControl = forwardRef(
  ({ id, label, type, required, onChange }, ref) => {
    return (
      <div>
        <label htmlFor={id} className="block">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          id={id}
          name={id}
          placeholder={label}
          className="w-full px-3 py-2 mt-1 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
          required={required}
          onChange={onChange}
        />
      </div>
    );
  }
);

export default function DentistPage() {
  const { selectedReservation } = useStateContext();
  const navigate = useNavigate();

  const [formValid, setFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const agreementRef = useRef();
  const messageRef = useRef();

  const handleFormChange = () => {
    // Basic validation: Check if all required fields are filled
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const phone = phoneRef.current?.value;
    const email = emailRef.current?.value;
    const agreementChecked = agreementRef.current?.checked;

    if (firstName && lastName && phone && email && agreementChecked) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  };

  const gomeddo = useGomeddo();
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const contact = new Contact(
        firstNameRef.current.value,
        lastNameRef.current.value,
        emailRef.current.value
      );
      contact.setCustomProperty("Phone", phoneRef.current.value);

      // Get message from textarea
      const message = messageRef.current.value;
      selectedReservation.setCustomProperty("Dentist_Message__c", message);

      selectedReservation.setCustomProperty(
        "B25__Reservation_Type__c",
        "a0Ubn0000017cw1EAA"
      );

      // Assuming 'setResource' is a function to set a property
      selectedReservation.setResource({
        id: selectedReservation.getCustomProperty("B25__Resource__c"),
      });

      selectedReservation.setContact(contact);

      const response = await gomeddo.saveReservation(selectedReservation);
      navigate("/confirmation/" + response.id);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (!selectedReservation) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col gap-8">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-24 h-24 border-8 border-black border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-semibold text-black">
            Your appointment is being made...
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold">Make an appointment</h2>
          <hr className="bg-gray-300 h-0.5" />
          <div className="flex flex-row gap-16">
            <div className="relative">
              <div className="bg-black rounded-3xl w-[14rem] h-[22rem] me-8 mb-8" />
              <img
                src={SampleImage}
                alt="Dentist Logo"
                className="absolute top-8 left-8 rounded-3xl w-[14rem] h-[22rem] object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 gap-8">
              <FormControl
                ref={firstNameRef}
                onChange={handleFormChange}
                label="First Name"
                type="text"
                id="first_name"
                required
              />
              <FormControl
                ref={lastNameRef}
                onChange={handleFormChange}
                label="Last Name"
                type="text"
                id="last_name"
                required
              />
              <FormControl
                ref={phoneRef}
                onChange={handleFormChange}
                label="Phone"
                type="tel"
                id="phone"
                required
              />
              <FormControl
                ref={emailRef}
                onChange={handleFormChange}
                label="Email"
                type="email"
                id="email"
                required
              />
              <div className="col-span-2">
                <label htmlFor="message" className="block">
                  Message
                </label>
                <textarea
                  ref={messageRef}
                  placeholder="Include a message.."
                  id="message"
                  className="w-full min-h-24 px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="flex items-center col-span-2">
                <input
                  ref={agreementRef}
                  type="checkbox"
                  id="agreement"
                  className="h-5 w-5 mr-2 text-green-500"
                  onChange={handleFormChange}
                />
                <p>You agree with our friendly privacy policy</p>
              </div>
              <Link to="/">
                <Button className="w-full">Cancel</Button>
              </Link>
              <Button
                disabled={!formValid}
                active={formValid}
                onClick={handleSubmit}
                className="w-full"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
