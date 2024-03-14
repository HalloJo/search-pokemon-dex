export type getPokemonRegionProps = (value?: string) => string;

export const getPokemonRegion: getPokemonRegionProps = (region) => {
  return region === "generation-i"
    ? "kanto"
    : region === "generation-ii"
    ? "johto"
    : region === "generation-iii"
    ? "hoenn"
    : region === "generation-iv"
    ? "sinnoh"
    : region === "generation-v"
    ? "unova"
    : region === "generation-vi"
    ? "kalos"
    : region === "generation-vii"
    ? "alola"
    : region === "generation-viii"
    ? "galar"
    : region === "generation-ix"
    ? "paldea"
    : "region";
};
