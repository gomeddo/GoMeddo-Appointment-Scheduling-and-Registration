import Logo from "../assets/logo.png";
import { Bluetooth } from "react-feather";

export default function Header() {
  return (
    <header className="text-blue-dark px-12 py-8 font-medium sticky top-0 left-0 bg-blue-light flex flex-col gap-2 lg:gap-0 lg:flex-row">
      <div className="flex items-center">
        <h1 className="uppercase text-3xl font-black">
          Bright Smiles Dental Clinic
        </h1>
        {/* TODO: Replace with actual tooth icon later */}
        <Bluetooth className="ml-2" />
      </div>

      <nav className="lg:ms-auto flex flex-row gap-4 lg:gap-8 items-center">
        <div className="cursor-default select-none hover:text-blue-dark hover:underline transition-all">
          Home
        </div>
        <div className="cursor-default select-none hover:text-blue-dark hover:underline transition-all">
          Services
        </div>
        <div className="cursor-default select-none hover:text-blue-dark hover:underline transition-all">
          About
        </div>
        <div className="cursor-default select-none hover:text-blue-dark hover:underline transition-all">
          Contact
        </div>
      </nav>
    </header>
  );
}
