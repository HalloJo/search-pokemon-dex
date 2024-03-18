const API_URL = "https://pokeapi.co/api/v2/pokemon";

export const fetchPokemon = async (pokemonName: string) => {
  const pokemonResponse = await fetch(
    `${API_URL}/${pokemonName.toLowerCase()}`
  );
  const pokemonData = await pokemonResponse.json();

  const speciesUrl = pokemonData.species.url;

  const pokemonSpeciesResponse = await fetch(speciesUrl);
  const pokemonSpeciesData = await pokemonSpeciesResponse.json();

  return { pokemonData, pokemonSpeciesData };
};
