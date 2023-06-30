export type PokemonType = {
  slot: number;
  type: {
    name: string;
  };
};

export type PokemonSpecies = {
  generation: {
    name: string;
  };
  capture_rate: number;
  is_mythical?: boolean;
  is_legendary?: boolean;
  flavor_text_entries: PokemonEntry[];
  genera: PokemonGenera[];
};

export type PokemonGenera = {
  genus: string;
  language?: {
    name: string;
    url: string;
  };
};

export type PokemonEntry = {
  flavor_text: string;
  language?: {
    name: string;
    url: string;
  };
  version: {
    name: string;
    url: string;
  };
};

export type PokemonAbility = {
  ability: {
    name?: string;
  };
};

export type PokemonStat = {
  base_stat: string;
  stat: {
    name: string;
  };
};

export type Pokemon = {
  id?: number;
  name?: string;
  sprites?: {
    front_default: string;
    versions?: {
      "generation-v": {
        "black-white": {
          animated: {
            front_default: string;
          };
        };
      };
    };
  };
  stats: PokemonStat[];
  abilities?: PokemonAbility[];
  types?: PokemonType[];
};
