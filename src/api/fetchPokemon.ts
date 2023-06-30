const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemon = async (pokemonName: string) => {
  return await fetch(`${API_URL}/${pokemonName.toLowerCase()}`).then(
    (response) => response.json()
  );
};
