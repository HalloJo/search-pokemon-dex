import { useCallback, useEffect, useState } from "react";
import "./styles/App.scss";
import { getPokemonTypeColor } from "./utils/getTypeColor";
import { getPokemonRegion } from "./utils/getRegion";
import { useFetchPokemon } from "./hooks/useFetchPokemon";
import { useFetchPokemonSpecies } from "./hooks/useFetchPokemonSpecies";
import { useFetchAllPokemon } from "./hooks/useFetchAllPokemon";
// import { useFetchPokemonTypes } from "./hooks/useFetchPokemonTypes";
import PokedexCard from "./PokedexCard";

const App = () => {
  const [selectedPokemonName, setSelectedPokemonName] = useState<
    string | undefined
  >("");
  const { isLoading, pokemonData, error, getPokemon } = useFetchPokemon();
  const { pokemonSpeciesData, getPokemonSpecies } = useFetchPokemonSpecies();
  // const { pokemonTypesData, getPokemonTypes } = useFetchPokemonTypes();
  const { allPokemon, getAllPokemon } = useFetchAllPokemon();

  const searchDropdownPokemon = useCallback(
    (pokemon: string) => {
      getPokemon(pokemon);

      getPokemonSpecies(pokemon);
      setSelectedPokemonName(pokemon);

      // console.log(pokemonData);
    },
    [
      getPokemon,
      getPokemonSpecies,
      // getPokemonTypes,
      // pokemonData?.id,
      // selectedPokemonId,
    ]
  );

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <div className="pokedex">
      <div className="pokedex__header">
        <pre>{JSON.stringify(selectedPokemonName, undefined, 3)}</pre>
        {/* <pre>{JSON.stringify(pokemonTypesData, undefined, 3)}</pre> */}
        <h2>✨ Looking for a Pokemon?</h2>
        <p>
          Find your Pokemon and check its type, region, if it's Jorik's favorite
          and more!
        </p>
        <div className="pokedex__header_attention">
          <span>Attention</span>
          <p>
            Pokemon names with a suffix (e.g. region, variant or shape) are
            having trouble recovering all available data. We are looking into
            it!
          </p>
        </div>
        <div className="pokedex__searchWrapper">
          <select
            value={selectedPokemonName}
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
          {/* {isLoading && <p>Loading..</p>} */}
          {isLoading && (
            <div className="pokedex__loading">
              <img src="public/favicon.svg" alt="Loading..." />
            </div>
          )}
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
