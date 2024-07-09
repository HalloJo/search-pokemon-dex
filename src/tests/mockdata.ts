import { PokemonSpecies } from "../types/types";

export const mockPokemonSpecies: PokemonSpecies = {
  capture_rate: 45,
  flavor_text_entries: [
    {
      flavor_text:
        "When the bulb on\nits back grows\nlarge, it appears\fto lose the\nability to stand\non its hind legs.",
      language: {
        name: "en",
        url: "https://pokeapi.co/api/v2/language/9/",
      },
      version: {
        name: "red",
        url: "https://pokeapi.co/api/v2/version/1/",
      },
    },
  ],
  genera: [
    {
      genus: "Seed Pokémon",
      language: {
        name: "en",
        url: "https://pokeapi.co/api/v2/language/9/",
      },
    },
  ],
  generation: {
    name: "generation-i",
  },
  is_legendary: false,
  is_mythical: false,
  varieties: [
    {
      is_default: true,
      pokemon: {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon/2/",
      },
    },
  ],
};
