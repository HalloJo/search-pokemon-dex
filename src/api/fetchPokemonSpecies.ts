const API_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species";

export const fetchPokemonSpecies = async (pokemonName: string) => {
  return await fetch(`${API_SPECIES_URL}/${pokemonName.toLowerCase()}`).then(
    (response) => response.json()
  );
};
