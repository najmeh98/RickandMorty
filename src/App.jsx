import React, { useEffect, useState } from "react";
import Navbar, { Favourites, Search, SearchResult } from "./components/Navar";
import CharacterDatils from "./components/CharacterDatils";
import CharacterList from "./components/CharacterList";
import "./App.css";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import Modal from "./components/Modal";
import useCharacter from "./hooks/useCharacter";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const { isloading, characters, setIsLoading, setCharacters } = useCharacter(
    "https://rickandmortyapi.com/api/character/?name",
    query
  );

  const [favourites, setFavourites] = useLocalStorage("FAVOURITE", []);

  useEffect(() => {
    async function fetchdata() {
      try {
        setIsLoading(true);
        const res = await axios.get(
          "https://rickandmortyapi.com/api/character"
        );
        console.log(res);
        console.log(res.data);

        setCharacters(res.data.results.slice(0, 5));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchdata();
  }, []);

  const handleSelectCharacter = (id) => {
    setSelectedId((prevId) => (prevId === id ? null : id));
  };

  const handleAddFavorite = (char) => {
    setFavourites((prevfav) => [...prevfav, char]);
  };

  const handleDeleteFavorite = (id) => {
    setFavourites((preFav) => preFav.filter((fav) => fav.id !== id));
    // setFavourites(favourite.filter(fav.id !==id))
  };

  const isAddToFavorite = favourites.map((fav) => fav.id).includes(selectedId);
  // [1,2,3]
  return (
    <div className="app">
      <Toaster />
      <Modal />
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        {/* <SearchResult numOfResult={characters} /> */}
        <Favourites
          favourites={favourites}
          onDeleteFavourite={handleDeleteFavorite}
        />
      </Navbar>
      <Main>
        <CharacterList
          selectedId={selectedId}
          characters={characters}
          isLoading={isloading}
          onSelectCharacter={handleSelectCharacter}
        />
        <CharacterDatils
          selectedId={selectedId}
          onAddFavourite={handleAddFavorite}
          isAddToFavorite={isAddToFavorite}
        />
      </Main>
    </div>
  );
}

const Main = ({ children }) => {
  return <div className="main">{children}</div>;
};
