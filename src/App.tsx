import { useCallback, useEffect, useState } from "react";
import "./styles/App.scss";

import { useFetchPokemon } from "./hooks/useFetchPokemon";
import { useFetchAllPokemon } from "./hooks/useFetchAllPokemon";
import PokedexCard from "./components/PokedexCard/PokedexCard";
import { navigatePokemon } from "./utils/navigatePokemon";

const App = () => {
  const [selectedPokemonName, setSelectedPokemonName] = useState<
    string | undefined
  >("");
  const [caughtPokemon, setCaughtPokemon] = useState<{
    [key: number]: boolean;
  }>({});

  const { isLoading, pokemonData, pokemonSpeciesData, error, getPokemon } =
    useFetchPokemon();
  const { allPokemon, getAllPokemon } = useFetchAllPokemon();

  useEffect(() => {
    getAllPokemon();

    const savedData = localStorage.getItem("caughtPokemon");
    const savedCaughtPokemon = savedData ? JSON.parse(savedData) : {};
    setCaughtPokemon(savedCaughtPokemon);
  }, []);

  const searchDropdownPokemon = useCallback(
    (pokemon: string) => {
      getPokemon(pokemon);

      setSelectedPokemonName(pokemon);
    },
    [getPokemon]
  );

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

  const handleCheckboxChange = (id: number) => {
    setCaughtPokemon((prevCaught) => {
      const updatedCaught = { ...prevCaught, [id]: !prevCaught[id] };

      localStorage.setItem("caughtPokemon", JSON.stringify(updatedCaught));

      return updatedCaught;
    });
  };

  const caughtCount = Object.values(caughtPokemon).filter(
    (caught) => caught
  ).length;

  return (
    <div className="pokedex">
      <div className="pokedex__header">
        <h2>✨ Looking for a Pokemon?</h2>
        <p>
          Find your Pokemon and check its type, region, if it's Jorik's favorite
          and more!
        </p>
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
        <p className="pokedex__caught">Total Caught: {caughtCount}</p>
      </div>

      {pokemonData && pokemonSpeciesData && (
        <PokedexCard
          pokemonData={pokemonData}
          pokemonSpeciesData={pokemonSpeciesData}
          caught={caughtPokemon[pokemonData.id] || false}
          onCheckboxChange={handleCheckboxChange}
        />
      )}
    </div>
  );
};

export default App;
