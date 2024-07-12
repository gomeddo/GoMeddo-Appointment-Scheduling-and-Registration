import clsx from "clsx"; // Importing clsx library for conditional class names
import Logo from "../assets/logo.png"; // Importing the logo image
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom
import {
  NAV_HEADER,
  NAV_HOME,
  NAV_SERVICES,
  NAV_CONTACT,
  NAV_ABOUT,
} from "../sdk/constants"; // Importing constants for navigation items

function NavItem({ children, disabled, ...rest }) {
  return (
    <Link
      {...rest} // Spread any additional props onto the Link component
      className={clsx(
        "cursor-default select-none hover:text-blue-dark hover:underline transition-all", // Base styles for navigation items
        {
          "cursor-not-allowed !no-underline": disabled, // Conditional styles when disabled=true
          "cursor-pointer": !disabled, // Conditional styles when disabled=false
        }
      )}
    >
      {children} {/* Displaying the text content of the navigation item */}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="text-blue-dark px-12 py-8 font-medium sticky top-0 left-0 flex flex-col gap-2 lg:gap-0 lg:flex-row bg-white">
      {/* Header container with flex layout and styling */}
      <div className="flex flex-row items-center">
        {/* Logo and header text */}
        <h1 className="uppercase text-3xl font-bold">{NAV_HEADER}</h1>
        <img src={Logo} alt="Dentist Logo" className="ml-4 h-6" />
      </div>
      <nav className="lg:ms-auto flex flex-row gap-4 lg:gap-8 items-center font-semibold text-lg">
        {/* Navigation section with flex layout */}
        <NavItem to="/">{NAV_HOME}</NavItem>
        {/* Link to Home page */}
        <NavItem to="/" disabled>
          {NAV_SERVICES}
        </NavItem>
        {/* Disabled link for Services */}
        <NavItem to="/" disabled>
          {NAV_ABOUT}
        </NavItem>
        {/* Disabled link for About */}
        <NavItem to="/" disabled>
          {NAV_CONTACT}
        </NavItem>
        {/* Disabled link for Contact */}
      </nav>
    </header>
  );
}
