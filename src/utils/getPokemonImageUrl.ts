import { PokemonSprites } from "../types/types";

export const getPokemonImageUrl = (sprites?: PokemonSprites) => {
  return (
    sprites?.versions?.["generation-v"]?.["black-white"]?.animated
      .front_default ||
    sprites?.front_default ||
    sprites?.other?.home?.front_default
  );
};
