import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";

function NavItem({ to, children, disabled }) {
  return (
    <div
      className={`cursor-default select-none hover:text-blue-dark hover:underline transition-all ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      <Link
        to={to}
        className={`ms-auto hover:scale-105 transition-all ${
          disabled ? "pointer-events-none" : ""
        }`}
      >
        {children}
      </Link>
    </div>
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
        <NavItem to="/" disabled={false}>
          Home
        </NavItem>
        <NavItem to="/" disabled={true}>
          Services
        </NavItem>
        <NavItem to="/" disabled={true}>
          About
        </NavItem>
        <NavItem to="/" disabled={true}>
          Contact
        </NavItem>
      </nav>
    </header>
  );
}
