import { EyeIcon } from "@heroicons/react/20/solid";
import React from "react";
import Loading from "./Loading";

export default function CharacterList({ characters, isLoading }) {
  if (isLoading) {
    return (
      <div className="characters-list">
        <Loading />
      </div>
    );
  }

  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character key={item.id} item={item} />
      ))}
    </div>
  );
}

function Character({ item }) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />
      <CharacterName item={item} />
      <CharacterInfo item={item} />

      <button className="icon red">
        <EyeIcon />
      </button>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "👨🏻" : "👩🏻‍🦳"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span className={`status ${item.status === "Dead" ? "red" : ""}`}></span>
      <span>{item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
}
