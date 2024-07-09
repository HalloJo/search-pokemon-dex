import { useState } from "react";
import { Pokemon, PokemonSpecies } from "../types/types";
import { fetchPokemon } from "../api/fetchPokemon";

export const useFetchPokemon = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [pokemonSpeciesData, setPokemonSpeciesData] =
    useState<PokemonSpecies>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getPokemon = (pokemonName: string) => {
    setIsLoading(true);
    setError(false);

    fetchPokemon(pokemonName)
      .then((data) => {
        setPokemonData((previousData) => ({
          ...previousData,
          ...data.pokemonData,
        }));
        setPokemonSpeciesData((previousSpeciesData) => ({
          ...previousSpeciesData,
          ...data.pokemonSpeciesData,
        }));
        setIsLoading(false);
      })
      .catch(() => {
        setError(true);
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    error,
    pokemonData,
    pokemonSpeciesData,
    getPokemon,
  };
};
