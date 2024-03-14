const API_TYPES_URL = "https://pokeapi.co/api/v2/type";

export const fetchPokemonTypes = async (pokemonId: number) => {
  return await fetch(`${API_TYPES_URL}/${pokemonId}`).then((response) =>
    response.json()
  );
};
