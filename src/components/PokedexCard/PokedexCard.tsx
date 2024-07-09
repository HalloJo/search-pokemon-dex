import { Pokemon, PokemonSpecies } from "../../types/types";
import { getPokemonRegion } from "../../utils/getRegion";
import { getPokemonTypeColor } from "../../utils/getTypeColor";
import "./PokedexCard.scss";
import { formatFlavorText } from "../../utils/formatText";
import { getPokemonImageUrl } from "../../utils/getPokemonImageUrl";
import { handlePlaySound } from "../../utils/handlePlaySound";

type PokedexCardProps = {
  pokemonData: Pokemon;
  pokemonSpeciesData: PokemonSpecies;
  caught: boolean;
  onCheckboxChange: (id: number) => void;
};

const PokedexCard = ({
  pokemonData,
  pokemonSpeciesData,
  caught,
  onCheckboxChange,
}: PokedexCardProps) => {
  const englishFlavorTextEntry = pokemonSpeciesData.flavor_text_entries?.find(
    (entry) => entry?.language?.name === "en"
  );

  const englishFlavorText = formatFlavorText(
    englishFlavorTextEntry?.flavor_text || "❌ No flavor text available.."
  );

  const englishGenusTextEntry = pokemonSpeciesData.genera?.find(
    (entry) => entry?.language?.name === "en"
  );
  const englishGenusText =
    englishGenusTextEntry?.genus || "❌ No genus available..";

  const handlePlaySoundClick = () => {
    handlePlaySound(pokemonData);
  };

  const imageUrl = getPokemonImageUrl(pokemonData.sprites);

  return (
    <div className="pokedex__card">
      <p className="pokedex__card_number">#{pokemonData.id}</p>
      <p
        className={`pokedex__card_region ${
          pokemonSpeciesData.generation ? "" : "pokedex__card_region_error"
        }`}
      >
        {pokemonSpeciesData.generation && pokemonSpeciesData.generation.name
          ? getPokemonRegion(pokemonSpeciesData.generation.name)
          : "No region data available.."}
      </p>
      {pokemonData.species && pokemonSpeciesData.is_legendary ? (
        <p className="pokedex__card_legendary">Legendary</p>
      ) : pokemonSpeciesData.is_mythical ? (
        <p className="pokedex__card_mythical">Mythical</p>
      ) : pokemonData.name === "scizor" ? (
        <p className="pokedex__card_favo">Jorik's favorite</p>
      ) : null}
      <div className="pokedex__card_spriteWrapper">
        {imageUrl ? (
          <img
            className="pokedex__card_sprite"
            src={imageUrl}
            alt={pokemonData.name}
          />
        ) : (
          "❌ No img yet.."
        )}
      </div>
      <h3 className="pokedex__card_name">{pokemonData.name}</h3>
      <div className="pokedex__card_genera">
        <p
          className={`pokedex__card_generaText ${
            pokemonData.species ? "" : "pokedex__card_generaText_error"
          }`}
        >
          {englishGenusText}
        </p>
      </div>
      <p className="pokedex__card_entry">{englishFlavorText}</p>
      <ul className="pokedex__card_types">
        {pokemonData.types?.map((pokemonType) => (
          <li
            className={`${getPokemonTypeColor(pokemonType.type.name)}`}
            key={pokemonType.slot}
          >
            {pokemonType.type.name}
          </li>
        ))}
      </ul>
      <div className="pokedex__card_info">
        <div className="pokedex__card_stats">
          <p className="pokedex__card_statsTitle">Stats</p>
          <ul className="pokedex__card_statsList">
            {pokemonData.stats?.map((pokemonStat) => (
              <li key={pokemonStat.stat.name}>
                <p className="pokedex__card_statsName">
                  {pokemonStat.stat.name}:
                </p>
                <p>{pokemonStat.base_stat}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="pokedex__card_abilities">
          <p className="pokedex__card_abilitiesTitle">Abilities</p>
          <ul className="pokedex__card_abilitiesList">
            {pokemonData.abilities?.map((pokemonAbility) => (
              <li key={pokemonAbility.ability.name}>
                {pokemonAbility.ability.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="pokedex__card_cry">
          <p className="pokedex__card_cryTitle">Cry</p>
          <button
            className="pokedex__card_cryButton"
            onClick={handlePlaySoundClick}
          >
            Play
          </button>
        </div>
        <div className="pokedex__card_capture">
          <p className="pokedex__card_captureTitle">Capture rate</p>
          <p className="pokedex__card_captureRate">
            {pokemonSpeciesData && pokemonSpeciesData.capture_rate
              ? pokemonSpeciesData.capture_rate
              : "❌ No capture rate data available.."}
          </p>
        </div>
        {pokemonSpeciesData.varieties.length > 1 && (
          <div className="pokedex__card_variaty">
            <p className="pokedex__card_variatyTitle">Forms</p>

            <ul className="pokedex__card_variatyList">
              {pokemonSpeciesData.varieties?.map((pokemonVariaty) => (
                <li
                  className={`pokedex__card_variatyEntry ${
                    pokemonVariaty.is_default
                      ? "pokedex__card_variatyEntry_default"
                      : ""
                  }`}
                  key={pokemonVariaty.pokemon.name}
                >
                  {pokemonVariaty.pokemon.name}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className={`pokedex__card_checkbox ${caught && "caught"}`}>
          <input
            type="checkbox"
            checked={caught}
            onChange={() => onCheckboxChange(pokemonData.id)}
          />
          <label>Caught</label>
        </div>
      </div>
    </div>
  );
};

export default PokedexCard;
