import { useState } from "react";
import { PokemonSpecies } from "../types";
import { fetchPokemonSpecies } from "../api/fetchPokemonSpecies";

export const useFetchPokemonSpecies = () => {
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState<
    PokemonSpecies | undefined
  >(undefined);

  const getPokemonSpecies = (pokemonName: string) => {
    fetchPokemonSpecies(pokemonName)
      .then((data) => {
        // Check if data is available
        if (data) {
          setPokemonSpeciesData(data);
        } else {
          // If data is not available, set pokemonSpeciesData to undefined
          setPokemonSpeciesData(undefined);
        }
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching Pokemon species data", error);
        // Reset pokemonSpeciesData to undefined
        setPokemonSpeciesData(undefined);
      });
  };

  return { pokemonSpeciesData, getPokemonSpecies, setPokemonSpeciesData };
};
