import React, { useEffect, useState } from "react";
import { allCharacters } from "../data/data";
import Navbar, { SearchResult } from "./components/Navar";
import CharacterDatils from "./components/CharacterDatils";
import CharacterList from "./components/CharacterList";
import "./App.css";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [characters, setCharacters] = useState(allCharacters);
  const [isloading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetData() {
      try {
        setIsLoading(true);
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("somethig went wrong");
        const data = res.json();
        setCharacters(data.results.slice(0, 5));
        // setIsLoading(false);
      } catch (error) {
        console.log(err.message);
        toast.error(err.message);
        // setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }

    fetData();
  }, []);
  return (
    <div className="app">
      <Toaster />
      <Navbar>{/* <SearchResult numOfResult={characters} /> */}</Navbar>
      <Main>
        <CharacterList characters={characters} isLoading={isloading} />
        <CharacterDatils />
      </Main>
    </div>
  );
}

const Main = ({ children }) => {
  return <div className="main">{children}</div>;
};
