const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=1025";

export const fetchAllPokemon = () => {
  return fetch(`${API_URL}`).then((response) => response.json());
};
