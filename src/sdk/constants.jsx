// Environment variable for Gomeddo API key
export const GOMEDDO_KEY = import.meta.env.VITE_GOMEDDO_KEY;

// Resource and reservation IDs
export const RESOURCE_COUNTRY_ID = import.meta.env.VITE_RESOURCE_COUNTRY_ID;
export const RESERVATION_RESOURCE_TYPE_ID = import.meta.env.VITE_RESERVATION_RESOURCE_TYPE_ID;

// Field names for resource, staff, and reservation
export const FIELD_RESOURCE_OBJECT = "B25__Resource__c";
export const FIELD_STAFF_OBJECT = "B25__Staff__c";
export const FIELD_RESOURCE_STAFF = "Staff_Name__c"; //THIS IS A CUSTOM FIELD THAT NEEDS TO BE ADDED
export const FIELD_RESERVATION_RESOURCE_NAME = "B25__ResourceName__c";
export const FIELD_RESERVATION_START_TIME = "B25__StartLocal__c";
export const FIELD_RESERVATION_END_TIME = "B25__EndLocal__c";
export const FIELD_RESERVATION_MESSAGE = "B25__Notes__c";
export const FIELD_RESERVATION_TOTAL_COST = "B25__Total_Price__c";
export const FIELD_RESERVATION_DURATION = "Duration_in_Hours__c";
export const FIELD_RESERVATION_BASE_PRICE = "B25__Base_Price__c";
export const FIELD_RESERVATION_RESOURCE_TYPE = "B25__Reservation_Type__c";
export const FIELD_RESOURCE_CITY = "B25__Context__c";
export const FIELD_RESOURCE_DEFAULT_PRICE = "B25__Default_Price__c";
export const FIELD_RESOURCE_IMG = "B25__Image_Url__c";

// Navigation labels
export const NAV_HEADER = "Bright Smiles Dental Clinic";
export const NAV_HOME = "Home";
export const NAV_SERVICES = "Services";
export const NAV_CONTACT = "Contact";
export const NAV_ABOUT = "About";

// Messages and labels for user interface
export const MESSAGE_APPOINTMENT_MADE_FOR = "Appointment Made For: ";
export const MESSAGE_CONFIRMED = "Confirmed";
export const MESSAGE_NO_CLINIC_MATCH_SEARCH = "No Clinics match your search...";
export const MESSAGE_LOADING_BOOKING_APPOINTMENT =
  "Your appointment is being made...";
export const MESSAGE_CANCELLATION_POLICY = (
  <div>
    Cancel for free anytime in advance, otherwise you will be charged
    <span className="font-medium"> 100%</span> for the checkup price for not
    showing up.
  </div>
);
export const MESSAGE_NO_TIME_SLOTS_AVAILABLE =
  "No available time slots currently";

// Time frames for appointments
export const TIME_FRAME_ALL = "All";
export const TIME_FRAME_MORNING = "Morning";
export const TIME_FRAME_AFTERNOON = "Afternoon";
export const TIME_FRAME_EVENING = "Evening";

// Labels for form fields and buttons
export const LABEL_MAKE_APPOINTMENT = "Make an appointment";
export const LABEL_SEARCH = "Search...";
export const LABEL_PRICE = "Price";
export const LABEL_CANCELLATION_POLICY = "Cancellation Policy";
export const LABEL_PRICE_PER_APPOINTMENT = "Price Per Appointment: ";
export const LABEL_FIRST_NAME = "First Name";
export const LABEL_LAST_NAME = "Last Name";
export const LABEL_PHONE = "Phone";
export const LABEL_EMAIL = "Email";
export const LABEL_MESSAGE = "Message";
export const LABEL_MESSAGE_PLACEHOLDER = "Include a message..";
export const LABEL_AGREEMENT_POLICY =
  "You agree with our friendly privacy policy";
export const LABEL_DENTIST_APPOINTMENT_WITH = "Dentist Appointment w/ ";
export const LABEL_TOTAL = "Total";
export const LABEL_USD = "USD: $";

// Button labels
export const BUTTON_CANCEL = "Cancel";
export const BUTTON_CONFIRM = "Confirm";
export const BUTTON_SHOW_MORE = "show more...";
export const BUTTON_SHOW_LESS = "show less...";
export const BUTTON_BACK_TO_HOMEPAGE = "Back To Homepage";
