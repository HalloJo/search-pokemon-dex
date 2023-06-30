import { useState } from "react";
import { Pokemon } from "../types";
import { fetchPokemon } from "../api/fetchPokemon";

export const useFetchPokemon = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getPokemon = (pokemonName: string) => {
    setIsLoading(true);
    setError(false);

    fetchPokemon(pokemonName)
      .then(setPokemonData)
      .then(
        () => {
          setIsLoading(false);
        },
        () => {
          setError(true);
          setIsLoading(false);
        }
      );
  };

  return { isLoading, error, pokemonData, getPokemon };
};
