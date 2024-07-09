import { Pokemon } from "../types/types";

export const handlePlaySound = (pokemonData: Pokemon) => {
  const audio = new Audio(pokemonData.cries?.latest);
  audio.play();
};
