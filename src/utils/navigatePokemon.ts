import { AllPokemon } from "../types/types";

export const navigatePokemon = (
  direction: "previous" | "next",
  selectedPokemonName: string | undefined,
  allPokemon: AllPokemon | undefined,
  searchDropdownPokemon: (pokemon: string) => void
) => {
  // Find the index of the currently selected Pokemon
  const currentIndex = allPokemon?.results?.findIndex(
    (pokemon) => pokemon.name === selectedPokemonName
  );

  // Ensure currentIndex is not undefined before proceeding
  if (currentIndex !== undefined) {
    if (direction === "previous") {
      // Ensure that currentIndex is a valid index and greater than 0
      if (currentIndex > 0) {
        const previousPokemonName = allPokemon?.results[currentIndex - 1].name;
        if (previousPokemonName) {
          searchDropdownPokemon(previousPokemonName);
        }
      }
    } else if (direction === "next") {
      // Check if currentIndex is less than the total number of Pokemon - 1
      if (currentIndex < (allPokemon?.results?.length || 0) - 1) {
        const nextPokemonName = allPokemon?.results[currentIndex + 1]?.name;
        if (nextPokemonName) {
          searchDropdownPokemon(nextPokemonName);
        }
      }
    }
  }
};
