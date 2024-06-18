import Logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="text-blue-dark px-12 py-8 font-medium sticky top-0 left-0 bg-blue-light">
      <nav className="flex flex-row gap-8 items-center">
        <div className="text-2xl font-bold uppercase flex-1">
          <img src={Logo} alt="Dentist Logo" className="h-7"/>
        </div>
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
