import { Pokemon, PokemonSpecies } from './types';
import { getPokemonRegionProps } from './utils/getRegion';
import { getPokemonTypeProps } from './utils/getTypeColor';

type PokedexCardProps = {
  pokemonData: Pokemon;
  getPokemonRegion: getPokemonRegionProps;
  pokemonSpeciesData: PokemonSpecies | undefined;
  getPokemonTypeColor: getPokemonTypeProps;
};

const PokedexCard = ({
  pokemonData,
  getPokemonRegion,
  pokemonSpeciesData,
  getPokemonTypeColor,
}: PokedexCardProps) => {
  return (
    <div className="pokedex__card">
      <p className="pokedex__card_number">#{pokemonData.id}</p>
      <p className="pokedex__card_region">
        {getPokemonRegion(pokemonSpeciesData?.generation.name)}
      </p>
      {pokemonSpeciesData?.is_legendary ? (
        <p className="pokedex__card_legendary">Legendary</p>
      ) : pokemonSpeciesData?.is_mythical ? (
        <p className="pokedex__card_mythical">Mythical</p>
      ) : pokemonData.name === 'scizor' ? (
        <p className="pokedex__card_favo">Jorik's favorite</p>
      ) : null}
      <div className="pokedex__card_spriteWrapper">
        <img
          className="pokedex__card_sprite"
          src={
            pokemonData.sprites?.versions?.['generation-v']?.['black-white']
              ?.animated.front_default
              ? pokemonData.sprites?.versions?.['generation-v']?.['black-white']
                  ?.animated.front_default
              : pokemonData?.sprites?.versions?.['generation-v']?.[
                  'black-white'
                ].front_default
          }
          alt={pokemonData.name}
        />
      </div>
      <h3 className="pokedex__card_name">{pokemonData.name}</h3>
      <div className="pokedex__card_genera">
        <p className="pokedex__card_generaText">
          {pokemonSpeciesData?.genera[7].genus
            ? pokemonSpeciesData?.genera[7].genus
            : 'No genus found yet..'}
        </p>
      </div>
      <p className="pokedex__card_entry">
        {pokemonSpeciesData?.flavor_text_entries[1].flavor_text}
      </p>
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
        <div className="pokedex__card_capture">
          <p className="pokedex__card_captureTitle">Capture rate</p>
          <p className="pokedex__card_captureRate">
            {pokemonSpeciesData?.capture_rate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PokedexCard;
