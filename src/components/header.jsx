import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="text-blue-dark px-12 py-8 font-medium sticky top-0 left-0 bg-blue-light">
      <nav className="flex flex-row gap-8 items-center">
        <Link to="/" className="text-2xl font-bold uppercase flex-1">
          <img src="src/assets/logo.png" alt="logo" className="h-8"/>
        </Link>
        <Link>Home</Link>
        <Link>Services</Link>
        <Link>About</Link>
        <Link>Content</Link>
      </nav>
    </header>
  );
}
