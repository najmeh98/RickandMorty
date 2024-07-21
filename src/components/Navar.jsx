import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import Modal from "./Modal";
import { Character } from "./CharacterList";
import { useState } from "react";

function Logo() {
  return <div className="navbar_logo">Logo🎯</div>;
}

export default function Navbar({ children }) {
  return (
    <nav className="navbar">
      <Logo />
      {children}
    </nav>
  );
}

export function Search({ query, setQuery }) {
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      type="text"
      name="text"
      className="text-field"
      placeholder="Search...."
    />
  );
}

export function SearchResult({ numOfResult }) {
  return <div className="navbar__result">Found {numOfResult} characters</div>;
}

export function Favourites({ favourites, onDeleteFavourite }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Modal title="List of Favourite" open={isOpen} onOpen={setIsOpen}>
        {favourites.map((item) => (
          <Character item={item} key={item.id}>
            <button
              className="icon red "
              onClick={() => onDeleteFavourite(item.id)}
            >
              <TrashIcon />
            </button>
          </Character>
        ))}
      </Modal>
      <button className="heart" onClick={() => setIsOpen(!isOpen)}>
        <HeartIcon className="icon" />
        <span className="badge">{favourites.length}</span>
      </button>
    </>
  );
}
