import { Contact } from "@gomeddo/sdk"; // Import Contact class from SDK
import { forwardRef, useRef, useState } from "react"; // Import necessary hooks from React
import { Link, Navigate, useNavigate } from "react-router-dom"; // Import Link and Navigate components from react-router-dom for navigation
import SampleImage from "../../assets/booking.png"; // Import sample image
import Button from "../../components/button"; // Import Button component
import {
  BUTTON_CANCEL,
  BUTTON_CONFIRM,
  FIELD_RESERVATION_BASE_PRICE,
  FIELD_RESERVATION_MESSAGE,
  FIELD_RESERVATION_RESOURCE_TYPE,
  FIELD_RESOURCE_DEFAULT_PRICE,
  FIELD_RESOURCE_OBJECT,
  LABEL_AGREEMENT_POLICY,
  LABEL_EMAIL,
  LABEL_FIRST_NAME,
  LABEL_LAST_NAME,
  LABEL_MAKE_APPOINTMENT,
  LABEL_MESSAGE,
  LABEL_MESSAGE_PLACEHOLDER,
  LABEL_PHONE,
  MESSAGE_LOADING_BOOKING_APPOINTMENT,
  RESERVATION_RESOURCE_TYPE_ID,
} from "../../sdk/constants"; // Import constants from SDK
import { useGomeddo } from "../../sdk/hooks"; // Import useGomeddo hook from SDK
import { useStateContext } from "../../sdk/stateContext"; // Import useStateContext hook from SDK

// ForwardRef component for form controls
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

// Main component for the DentistPage
export default function DentistPage() {
  const { selectedReservation, selectedDentist } = useStateContext(); // Access selectedReservation and selectedDentist from state context
  const navigate = useNavigate(); // Hook to programmatically navigate

  const [formValid, setFormValid] = useState(false); // State to track form validity
  const [isLoading, setIsLoading] = useState(false); // State to track loading state

  // Refs for form input fields
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();
  const agreementRef = useRef();
  const messageRef = useRef();

  // Function to handle form changes
  const handleFormChange = () => {
    // Basic validation: Check if all required fields are filled
    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const phone = phoneRef.current?.value;
    const email = emailRef.current?.value;
    const agreementChecked = agreementRef.current?.checked;

    if (firstName && lastName && phone && email && agreementChecked) {
      setFormValid(true); // Set formValid to true if all fields are filled
    } else {
      setFormValid(false); // Set formValid to false if any field is missing
    }
  };

  const gomeddo = useGomeddo(); // Initialize gomeddo hook from SDK

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Set loading state to true
      const contact = new Contact(
        firstNameRef.current.value,
        lastNameRef.current.value,
        emailRef.current.value
      );
      contact.setCustomProperty("Phone", phoneRef.current.value); // Set phone number in contact

      // Get message from textarea
      const message = messageRef.current.value;
      selectedReservation.setCustomProperty(FIELD_RESERVATION_MESSAGE, message); // Set reservation message
      selectedReservation.setCustomProperty(
        FIELD_RESERVATION_RESOURCE_TYPE,
        RESERVATION_RESOURCE_TYPE_ID
      ); // Set reservation resource type
      selectedReservation.setCustomProperty(
        FIELD_RESERVATION_BASE_PRICE,
        selectedDentist.getCustomProperty(FIELD_RESOURCE_DEFAULT_PRICE)
      ); // Set reservation base price

      // Set resource ID
      selectedReservation.setResource({
        id: selectedReservation.getCustomProperty(FIELD_RESOURCE_OBJECT),
      });

      selectedReservation.setContact(contact); // Set contact in reservation

      const response = await gomeddo.saveReservation(selectedReservation); // Save reservation using gomeddo hook
      console.log(response); // Log response to console
      navigate("/confirmation/" + response.id); // Navigate to confirmation page with reservation ID
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.error(error); // Log error to console
      setIsLoading(false); // Set loading state to false
    }
  };

  // Redirect to home page if selectedReservation or selectedDentist is missing
  if (!selectedReservation || !selectedDentist) {
    return <Navigate to="/" />;
  }

  // Render UI based on loading state
  return (
    <div className="flex flex-col gap-8">
      {isLoading ? ( // Show loading indicator if isLoading is true
        <div className="flex flex-col items-center justify-center h-full pt-40">
          <div className="w-24 h-24 border-8 border-black border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-semibold text-black">
            {MESSAGE_LOADING_BOOKING_APPOINTMENT}
          </p>
        </div>
      ) : (
        <div>
          <h2 className="text-3xl font-semibold">{LABEL_MAKE_APPOINTMENT}</h2>
          <hr className="bg-gray-300 h-0.5 my-8" />
          <div className="flex flex-row gap-16 items-start">
            {/* Display image and form */}
            <div className="relative">
              <div className="bg-black rounded-3xl w-[14rem] h-[22rem] me-8 mb-8" />
              <img
                src={SampleImage}
                alt="Dentist Logo"
                className="absolute top-8 left-8 rounded-3xl w-[14rem] h-[22rem] object-cover"
              />
            </div>
            <div className="flex-1 flex flex-col lg:grid lg:grid-cols-2 gap-8">
              {/* Render form controls */}
              <FormControl
                ref={firstNameRef}
                onChange={handleFormChange}
                label={LABEL_FIRST_NAME}
                type="text"
                id="first_name"
                required
              />
              <FormControl
                ref={lastNameRef}
                onChange={handleFormChange}
                label={LABEL_LAST_NAME}
                type="text"
                id="last_name"
                required
              />
              <FormControl
                ref={phoneRef}
                onChange={handleFormChange}
                label={LABEL_PHONE}
                type="tel"
                id="phone"
                required
              />
              <FormControl
                ref={emailRef}
                onChange={handleFormChange}
                label={LABEL_EMAIL}
                type="email"
                id="email"
                required
              />
              <div className="col-span-2">
                <label htmlFor="message" className="block">
                  {LABEL_MESSAGE}
                </label>
                <textarea
                  ref={messageRef}
                  placeholder={LABEL_MESSAGE_PLACEHOLDER}
                  id="message"
                  className="w-full min-h-24 px-3 py-2 text-gray-700 border rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Agreement checkbox */}
              <div className="flex items-center col-span-2">
                <input
                  ref={agreementRef}
                  type="checkbox"
                  id="agreement"
                  className="h-5 w-5 mr-2 text-green-500"
                  onChange={handleFormChange}
                />
                <p>{LABEL_AGREEMENT_POLICY}</p>
              </div>
              {/* Cancel and Confirm buttons */}
              <Link to="/">
                <Button className="w-full">{BUTTON_CANCEL}</Button>
              </Link>
              <Button
                disabled={!formValid} // Disable Confirm button if form is invalid
                active={formValid}
                onClick={handleSubmit} // Handle form submission
                className="w-full"
              >
                {BUTTON_CONFIRM}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
