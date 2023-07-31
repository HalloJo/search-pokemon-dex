import { useCallback, useEffect, useState } from "react";
import "./styles/App.scss";
import { getPokemonTypeColor } from "./utils/getTypeColor";
import { getPokemonRegion } from "./utils/getRegion";
import { useFetchPokemon } from "./hooks/useFetchPokemon";
import { useFetchPokemonSpecies } from "./hooks/useFetchPokemonSpecies";
import { useFetchAllPokemon } from "./hooks/useFetchAllPokemon";

const App = () => {
  // const [pokemonName, setPokemonName] = useState<string>("");
  const [selectedPokemon, setSelectedPokemon] = useState<string>("");
  const { isLoading, pokemonData, error, getPokemon } = useFetchPokemon();
  const { pokemonSpeciesData, getPokemonSpecies } = useFetchPokemonSpecies();
  const { allPokemon, getAllPokemon } = useFetchAllPokemon();

  // const searchPokemon = () => {
  //   getPokemon(pokemonName);
  //   getPokemonSpecies(pokemonName);
  //   setSelectedPokemon(pokemonName);
  // };

  const searchDropdownPokemon = useCallback(
    (event: any) => {
      // setPokemonName(event);
      setSelectedPokemon(event);
      getPokemon(event);
      getPokemonSpecies(event);
    },
    [getPokemon, getPokemonSpecies]
  );

  useEffect(() => {
    getAllPokemon();
  }, []);

  return (
    <div className="pokedex">
      <div className="pokedex__header">
        <h2>✨ Looking for a Pokemon?</h2>
        <p>
          Find your Pokemon and check its type, region, if it's Jorik's favorite
          and more!
        </p>
        <div className="pokedex__searchWrapper">
          {/* <input
            type="text"
            value={pokemonName}
            onChange={(event) => {
              setPokemonName(event.target.value);
            }}
            placeholder="Type its name here.."
          /> */}
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
        <div className="pokedex__card">
          <p className="pokedex__card_number">#{pokemonData.id}</p>
          <p className="pokedex__card_region">
            {getPokemonRegion(pokemonSpeciesData?.generation.name)}
          </p>
          {pokemonSpeciesData?.is_legendary ? (
            <p className="pokedex__card_legendary">Legendary</p>
          ) : pokemonSpeciesData?.is_mythical ? (
            <p className="pokedex__card_mythical">Mythical</p>
          ) : pokemonData.name === "scizor" ? (
            <p className="pokedex__card_favo">Jorik's favorite</p>
          ) : null}
          <div className="pokedex__card_spriteWrapper">
            <img
              className="pokedex__card_sprite"
              src={
                pokemonData.sprites?.versions?.["generation-v"]?.["black-white"]
                  ?.animated.front_default
                  ? pokemonData.sprites?.versions?.["generation-v"]?.[
                      "black-white"
                    ]?.animated.front_default
                  : pokemonData?.sprites?.versions?.["generation-v"]?.[
                      "black-white"
                    ].front_default
              }
              alt={pokemonData.name}
            />
          </div>
          <h3 className="pokedex__card_name">{pokemonData.name}</h3>
          <div className="pokedex__card_genera">
            <p className="pokedex__card_generaText">
              {pokemonSpeciesData?.genera[7].genus}
            </p>
          </div>
          <p className="pokedex__card_entry">
            {pokemonSpeciesData?.flavor_text_entries[1].flavor_text}
          </p>
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
            <div className="pokedex__card_stats">
              <p className="pokedex__card_statsTitle">Stats</p>
              <ul className="pokedex__card_statsList">
                {pokemonData.stats?.map((pokemonStat) => (
                  <li key={pokemonStat.stat.name}>
                    <p className="pokedex__card_statsName">
                      {pokemonStat.stat.name}:
                    </p>
                    <p>{pokemonStat.base_stat}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pokedex__card_abilities">
              <p className="pokedex__card_abilitiesTitle">Abilities</p>
              <ul className="pokedex__card_abilitiesList">
                {pokemonData.abilities?.map((pokemonAbility) => (
                  <li key={pokemonAbility.ability.name}>
                    {pokemonAbility.ability.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pokedex__card_capture">
              <p className="pokedex__card_captureTitle">Capture rate</p>
              <p className="pokedex__card_captureRate">
                {pokemonSpeciesData?.capture_rate}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
