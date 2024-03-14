import { useState } from "react";
import { fetchPokemonTypes } from "../api/fetchPokemonTypes";

export const useFetchPokemonTypes = () => {
  const [pokemonTypesData, setPokemonTypesData] = useState<any>();

  const getPokemonTypes = (pokemonId: number) => {
    fetchPokemonTypes(pokemonId).then(setPokemonTypesData);
  };

  return { pokemonTypesData, getPokemonTypes };
};
