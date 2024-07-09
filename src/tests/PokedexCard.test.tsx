import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokedexCard from "../components/PokedexCard/PokedexCard";

const mockPokemonData = { id: 1, name: "Bulbasaur" };
const mockPokemonSpeciesData = {
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

const mockOnCheckboxChange = (id: number) => {
  console.log(`Checkbox with ID ${id} clicked`);
};

describe("PokedexCard Component", () => {
  test("renders the checkbox", () => {
    render(
      <PokedexCard
        pokemonSpeciesData={mockPokemonSpeciesData}
        pokemonData={mockPokemonData}
        caught={false}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("checkbox change calls onCheckboxChange with correct id", () => {
    const mockOnCheckboxChange = vi.fn();
    render(
      <PokedexCard
        pokemonData={mockPokemonData}
        pokemonSpeciesData={mockPokemonSpeciesData}
        caught={false}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(mockOnCheckboxChange).toHaveBeenCalledWith(1);
  });

  test("renders with caught class when caught", () => {
    render(
      <PokedexCard
        pokemonSpeciesData={mockPokemonSpeciesData}
        pokemonData={mockPokemonData}
        caught={true}
        onCheckboxChange={mockOnCheckboxChange}
      />
    );

    const checkboxDiv = screen.getByRole("checkbox").parentElement;
    expect(checkboxDiv).toHaveClass("caught");
  });
});
