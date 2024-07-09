import { useState } from "react";
import { AllPokemon } from "../types/types";
import { fetchAllPokemon } from "../api/fetchAllPokemon";

export const useFetchAllPokemon = () => {
  const [allPokemon, setAllPokemon] = useState<AllPokemon>();

  const getAllPokemon = () => {
    fetchAllPokemon().then(setAllPokemon);
  };

  return { allPokemon, getAllPokemon };
};
