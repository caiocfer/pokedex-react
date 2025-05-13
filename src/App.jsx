import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import GetPokemonListItem from "./components/pokemonListItem";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <GetPokemons />
      </div>
    </QueryClientProvider>
  );

  function GetPokemons() {
    const { isPending, error, data, isFetching } = useQuery({
      queryKey: ["repoData"],
      queryFn: async () => {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=0&limit=150`
        );
        return await response.json();
      },
    });
    if (isPending) return "Loading...";

    if (error) return "An error has occurred: " + error.message;
    const pokemonListItems = data.results.map((pokemon, index) => (
      <div className="p-3 flex space-x-4" key={index}>
        <GetPokemonListItem pokemon={pokemon.name} />
      </div>
    ));

    return <div className="grid grid-cols-2">{pokemonListItems}</div>;
  }
}

export default App;
