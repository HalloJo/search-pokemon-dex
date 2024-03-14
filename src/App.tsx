import { useCallback, useEffect, useState } from "react";
import "./styles/App.scss";
import { getPokemonTypeColor } from "./utils/getTypeColor";
import { getPokemonRegion } from "./utils/getRegion";
import { useFetchPokemon } from "./hooks/useFetchPokemon";
import { useFetchPokemonSpecies } from "./hooks/useFetchPokemonSpecies";
import { useFetchAllPokemon } from "./hooks/useFetchAllPokemon";
import { useFetchPokemonTypes } from "./hooks/useFetchPokemonTypes";
import PokedexCard from "./PokedexCard";

const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const { isLoading, pokemonData, error, getPokemon } = useFetchPokemon();
  const { pokemonSpeciesData, getPokemonSpecies } = useFetchPokemonSpecies();
  const { pokemonTypesData, getPokemonTypes } = useFetchPokemonTypes();
  const { allPokemon, getAllPokemon } = useFetchAllPokemon();

  const searchDropdownPokemon = useCallback(
    (pokemon: number | string) => {
      if (typeof pokemon === "number") {
        getPokemonTypes(pokemon);
      } else if (typeof pokemon === "string") {
        getPokemon(pokemon);
        setSelectedPokemon(pokemon);
        getPokemonSpecies(pokemon);
      }
      console.log(pokemonData);
    },
    [getPokemon, getPokemonSpecies, getPokemonTypes, pokemonData]
  );

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <div className="pokedex">
      <div className="pokedex__header">
        <pre>{JSON.stringify(pokemonTypesData, undefined, 3)}</pre>
        <h2>✨ Looking for a Pokemon?</h2>
        <p>
          Find your Pokemon and check its type, region, if it's Jorik's favorite
          and more!
        </p>
        <div className="pokedex__searchWrapper">
          <select
            value={selectedPokemon}
            onChange={(event) => {
              searchDropdownPokemon(event.target.value);
            }}
          >
            <option value="first">Select a Pokemon here..</option>
            {allPokemon?.results?.map((pokemon) => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>
          {/* <button type="button" onClick={searchPokemon}>
            Search
          </button> */}
          {isLoading && <p>Loading..</p>}
          {error && (
            <div className="pokedex__error">
              ❌ An error occurred.. Please check the spelling or try again!
            </div>
          )}
        </div>
      </div>

      {pokemonData && (
        <PokedexCard
          pokemonData={pokemonData}
          getPokemonRegion={getPokemonRegion}
          pokemonSpeciesData={pokemonSpeciesData}
          getPokemonTypeColor={getPokemonTypeColor}
        />
      )}
    </div>
  );
};

export default App;
