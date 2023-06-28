import { ReactNode, useEffect, useState } from "react";
import "./styles/App.scss";
import { getPokemonTypeColor } from "./utils/getTypeColor";
import { getPokemonRegion } from "./utils/getRegion";

export type PokemonType = {
  slot: number;
  type: {
    name: string;
  };
};

export type PokemonSpecies = {
  generation: {
    name: string;
  };
  is_mythical?: boolean;
  is_legendary?: boolean;
  flavor_text_entries: [];
};

export type PokemonAbility = {
  ability: {
    name?: string;
  };
};

export type Pokemon = {
  id?: number;
  name?: string;
  sprites?: {
    front_default: string;
  };
  abilities?: PokemonAbility[];
  types?: PokemonType[];
};

const App = () => {
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [pokemonSpeciesData, setPokemonSpeciesData] =
    useState<PokemonSpecies>();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const API_URL = "https://pokeapi.co/api/v2/pokemon";
  const API_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

  const fetchPokemon = async (pokemonName: string) => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/${pokemonName.toLowerCase()}`);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const pokemonData = await response.json();

      setPokemonData(pokemonData);
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchPokemonSpecies = async (pokemonName: string) => {
    try {
      const responseSpecies = await fetch(
        `${API_SPECIES_URL}/${pokemonName.toLowerCase()}`
      );
      if (!responseSpecies.ok) {
        throw new Error("Something went wrong");
      }
      const pokemonSpeciesData = await responseSpecies.json();

      setPokemonSpeciesData(pokemonSpeciesData);
      setError("");
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
    setIsLoading(false);
  };

  const searchPokemon = () => {
    fetchPokemon(pokemonName);
    fetchPokemonSpecies(pokemonName);
  };

  return (
    <div className="pokedex">
      <div className="pokedex__header">
        <h2>✨ Looking for a Pokemon?</h2>
        <p>Start by typing the name.</p>
        <div className="pokedex__searchWrapper">
          <input
            type="text"
            value={pokemonName}
            onChange={(event) => setPokemonName(event.target.value)}
          />
          <button type="button" onClick={searchPokemon}>
            Search
          </button>
        </div>
      </div>
      {isLoading && <p>Loading..</p>}
      {error && (
        <div className="pokedex__error">
          ❌ An error occurred.. Please check the spelling or try again!
        </div>
      )}
      {pokemonData && (
        <div className="pokedex__card">
          <p className="pokedex__card_number">#{pokemonData.id}</p>
          <p className="pokedex__card_region">
            {getPokemonRegion(pokemonSpeciesData?.generation.name)}
          </p>
          {pokemonSpeciesData?.is_legendary ? (
            <p className="pokedex__card_legendary">Legendary</p>
          ) : pokemonSpeciesData?.is_mythical ? (
            <p className="pokedex__card_mythical">Mythical</p>
          ) : null}

          <div>
            <img
              className="pokedex__card_sprite"
              src={pokemonData.sprites?.front_default}
            />
          </div>
          <h3 className="pokedex__card_name">{pokemonData.name}</h3>

          <ul className="pokedex__card_types">
            {pokemonData.types?.map((pokemonType) => (
              <li
                className={`${getPokemonTypeColor(pokemonType.type.name)}`}
                key={pokemonType.slot}
              >
                {pokemonType.type.name}
              </li>
            ))}
          </ul>
          <div className="pokedex__card_info">
            <div className="pokedex__card_abilities">
              <p>Abilities</p>
              <ul className="pokedex__card_abilitiesList">
                {pokemonData.abilities?.map((pokemonAbility) => (
                  <li key={pokemonAbility.ability.name}>
                    {pokemonAbility.ability.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
