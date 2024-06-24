import clsx from "clsx";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function NavItem({ children, disabled, ...rest }) {
  return (
    <Link
      {...rest}
      className={clsx(
        "cursor-default select-none hover:text-blue-dark hover:underline transition-all",
        {
          "cursor-not-allowed !no-underline": disabled,
          "cursor-pointer": !disabled,
        }
      )}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  return (
    <header className="text-blue-dark px-12 py-8 font-medium sticky top-0 left-0 flex flex-col gap-2 lg:gap-0 lg:flex-row bg-white">
      <div className="flex flex-row items-center">
        <h1 className="uppercase text-3xl font-bold">
          Bright Smiles Dental Clinic
        </h1>
        <img src={Logo} alt="Dentist Logo" className="ml-4 h-6" />
      </div>
      <nav className="lg:ms-auto flex flex-row gap-4 lg:gap-8 items-center font-semibold text-lg">
        <NavItem to="/">Home</NavItem>
        <NavItem to="/" disabled>
          Services
        </NavItem>
        <NavItem to="/" disabled>
          About
        </NavItem>
        <NavItem to="/" disabled>
          Contact
        </NavItem>
      </nav>
    </header>
  );
}
