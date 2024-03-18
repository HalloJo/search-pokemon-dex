import { useCallback, useEffect, useState } from "react";
import "./styles/App.scss";

import { useFetchPokemon } from "./hooks/useFetchPokemon";
import { useFetchAllPokemon } from "./hooks/useFetchAllPokemon";
import PokedexCard from "./PokedexCard";
import { navigatePokemon } from "./utils/navigatePokemon";

const App = () => {
  const [selectedPokemonName, setSelectedPokemonName] = useState<
    string | undefined
  >("");
  const { isLoading, pokemonData, pokemonSpeciesData, error, getPokemon } =
    useFetchPokemon();
  const { allPokemon, getAllPokemon } = useFetchAllPokemon();

  const searchDropdownPokemon = useCallback(
    (pokemon: string) => {
      getPokemon(pokemon);

      setSelectedPokemonName(pokemon);
    },
    [getPokemon]
  );

  useEffect(() => {
    getAllPokemon();
  }, []);

  const handlePreviousPokemon = () => {
    navigatePokemon(
      "previous",
      selectedPokemonName,
      allPokemon,
      searchDropdownPokemon
    );
  };

  const handleNextPokemon = () => {
    navigatePokemon(
      "next",
      selectedPokemonName,
      allPokemon,
      searchDropdownPokemon
    );
  };

  return (
    <div className="pokedex">
      <div className="pokedex__header">
        <h2>✨ Looking for a Pokemon?</h2>
        <p>
          Find your Pokemon and check its type, region, if it's Jorik's favorite
          and more!
        </p>
        {/* <div className="pokedex__header_attention">
          <span>Attention</span>
          <p>
            Pokemon names with a suffix (e.g. region, variant or shape) are
            having trouble recovering all available data. We are looking into
            it!
          </p>
        </div> */}
        <div className="pokedex__searchWrapper">
          <select
            value={selectedPokemonName}
            onChange={(event) => {
              searchDropdownPokemon(event.target.value);
            }}
          >
            <option value="first">Select a Pokemon here..</option>
            {allPokemon?.results?.map((pokemon, index) => (
              <option key={pokemon.name} value={pokemon.name}>
                #{index + 1}.{" "}
                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
              </option>
            ))}
          </select>
          {selectedPokemonName && (
            <div className="pokedex__buttons">
              <button
                onClick={handlePreviousPokemon}
                disabled={pokemonData?.id === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNextPokemon}
                disabled={pokemonData?.id === 1025}
              >
                Next
              </button>
            </div>
          )}

          {isLoading && (
            <div className="pokedex__loading">
              <img src="/favicon.svg" alt="Loading..." />
            </div>
          )}
          {error && (
            <div className="pokedex__error">
              ❌ An error occurred.. Please check the spelling or try again!
            </div>
          )}
        </div>
      </div>

      {pokemonData && pokemonSpeciesData && (
        <PokedexCard
          pokemonData={pokemonData}
          pokemonSpeciesData={pokemonSpeciesData}
        />
      )}
    </div>
  );
};

export default App;
