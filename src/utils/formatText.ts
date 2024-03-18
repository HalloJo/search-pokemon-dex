export const formatFlavorText = (flavorText: string) => {
  let formattedText = flavorText.replace(/\f/g, "\n");

  formattedText = formattedText.replace(/POKéMON/g, "Pokémon");

  return formattedText;
};
