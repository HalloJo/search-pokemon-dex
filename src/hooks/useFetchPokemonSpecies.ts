import { useState } from "react";
import { PokemonSpecies } from "../types";
import { fetchPokemonSpecies } from "../api/fetchPokemonSpecies";

export const useFetchPokemonSpecies = () => {
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState<
    PokemonSpecies | undefined
  >(undefined);

  const getPokemonSpecies = (pokemonName: string) => {
    fetchPokemonSpecies(pokemonName).then(setPokemonSpeciesData);
  };

  return { pokemonSpeciesData, getPokemonSpecies };
};
