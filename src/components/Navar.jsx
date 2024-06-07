import { HeartIcon } from "@heroicons/react/24/outline";

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      <Search />
      {children}
      <Favourites />
    </nav>
  );
}

function Logo() {
  return <div className="navbar_logo">Logo🎯</div>;
}

function Search() {
  return (
    <input
      type="text"
      name="text"
      id="text"
      className="text-field"
      placeholder="Search...."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div>{numOfResult}</div>;
}

function Favourites() {
  return (
    <button className="heart">
      <HeartIcon className="icon" />
      <span className="badge">4</span>
    </button>
  );
}
