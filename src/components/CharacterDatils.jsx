import React, { useState, useEffect } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/20/solid";
import { Loading } from "./Loading";
import axios from "axios";

export function CharacterDatils({
  selectedId,
  onAddFavourite,
  isAddToFavorite,
}) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${selectedId}`
        );
        setCharacter(data);

        console.log("character", data);

        const episodesId = data.episode.map((e) => e.split("/").at(-1));

        const { data: episodeData } = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodesId}`
        );

        console.log(episodeData);

        setEpisodes([episodeData].flat().slice(0, 6));
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setIsLoading(false);
      }
    }
    if (selectedId) fetchData();
  }, [selectedId]);

  if (isLoading) {
    return (
      <div style={{ flex: 1, color: "var(--slate-300" }}>
        <Loading />
      </div>
    );
  }

  if (!character || !selectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300" }}>
        Please select a character
      </div>
    );

  return (
    <div style={{ flex: 1 }}>
      <CharacterSubInfo
        onAddFavourite={onAddFavourite}
        character={character}
        isAddToFavorite={isAddToFavorite}
      />
      <EpisodeList episodes={episodes} />
    </div>
  );
}

export default CharacterDatils;

function CharacterSubInfo({ isAddToFavorite, character, onAddFavourite }) {
  return (
    <div className="character-detail">
      <img
        src={character.image}
        alt={character.name}
        className="character-detail_img"
      />
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "" : ""}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span
            className={`status ${character.status === "Dead" ? "red" : ""}`}
          ></span>
          <span>&nbsp;{character.status}</span>
          <span> - &nbsp;{character.species}</span>
        </div>

        <div className="location">
          <p>Last known location:</p>
          <p style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            {character.location.name}
          </p>
        </div>

        <div className="actions">
          {isAddToFavorite && isAddToFavorite ? (
            <p>Already Added To Favourite ✅</p>
          ) : (
            <button
              className="btn btn--primary"
              onClick={() => onAddFavourite(character)}
            >
              Add to Favourite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function EpisodeList({ episodes }) {
  const [sortBy, setSortBy] = useState(true);

  let soretdEpisode;

  if (sortBy) {
    soretdEpisode = [...episodes].sort(
      (a, b) => new Date(a.created) - new Date(b.created)
    );
  } else {
    soretdEpisode = [...episodes].sort(
      (a, b) => new Date(b.created) - new Date(a.created)
    );
  }

  return (
    <div className="character-episodes">
      <div className="title">
        <h2>list of Episode: </h2>
        <button onClick={() => setSortBy(!sortBy)}>
          <ArrowUpCircleIcon
            className="icon"
            style={{ rotate: sortBy ? "0deg" : "180deg" }}
          />
        </button>
      </div>
      <ul>
        {soretdEpisode.map((item, index) => {
          return (
            <li key={item.id}>
              <div>
                {String(index + 1).padStart(2 - "0")} - {item.episode}
                <strong>{item.name}</strong>
              </div>
              <div className="badge badge--secondary">{item.air_date}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
