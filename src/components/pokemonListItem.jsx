import { useQuery } from "@tanstack/react-query";

function GetPokemonListItem({ pokemon }) {
  const pokemonName = pokemon;

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["pokemonInfo", pokemonName],
    queryFn: async () => {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );

      return await response.json();
    },
  });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const sprite = data.sprites.front_default;

  const types = data.types;
  const typelist = types.map((typeObj) => typeObj.type.name);

  console.log(`${typelist[0]}`);

  const getTypesColor = (string) => {
    switch (string) {
      case "bug":
        return "bg-lime-700 border-lime-900";
      case "dark":
        return "bg-slate-700 border-slate-900";
      case "dragon":
        return "bg-indigo-700 border-slate-950";
      case "electric":
        return "bg-amber-300 border-amber-400";
      case "fairy":
        return "bg-fuchsia-300 border-pink-900";
      case "fighting":
        return "bg-red-900 border-red-950";
      case "fire":
        return "bg-red-600 border-orange-900";
      case "flying":
        return "bg-sky-300 border-sky-900";
      case "ghost":
        return "bg-indigo-800 border-indigo-950";
      case "grass":
        return "bg-green-700 border-green-900";
      case "ground":
        return "bg-amber-700 border-amber-950";
      case "ice":
        return "bg-cyan-300 border-cyan-700";
      case "normal":
        return "bg-neutral-400 border-neutral-600";
      case "poison":
        return "bg-purple-900 border-violet-950";
      case "psychic":
        return "bg-pink-600 border-pink-800";
      case "rock":
        return "bg-yellow-800 border-yellow-900";
      case "steel":
        return "bg-gray-500 border-gray-900";
      case "water":
        return "bg-blue-400 border-blue-800";
      default:
        return "";
    }
  };

  return (
    <div
      className={`h-[150px] w-[440px]  ${getTypesColor(
        typelist[0]
      )} border-3 rounded-md flex`}
    >
      <div>
        <img className="h-[150px]" src={sprite} alt="" />
      </div>
      <div>
        <h1 className="font-bold align-middle mb-5">{pokemonName}</h1>
        <div>
          {typelist.map((type, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full mr-2 text-sm border-3 ${getTypesColor(
                type
              )}`}
            >
              {type.toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetPokemonListItem;
