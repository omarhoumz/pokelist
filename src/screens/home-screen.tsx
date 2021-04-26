import Link from 'next/link'
import * as React from 'react'

import { getIdFromUrl } from 'src/utils'

export default function HomeScreen() {
  const [pokemonData, setPokemonData] = React.useState([])

  React.useEffect(() => {
    async function getPokemons() {
      const url = `https://pokeapi.co/api/v2/pokemon`
      const pokeData = await (await fetch(url)).json()
      setPokemonData(pokeData.results)
    }

    getPokemons()
  }, [])

  return (
    <div>
      <h1>Poke List</h1>
      <h2>Home</h2>

      <ul>
        {pokemonData.map((pokemon) => {
          return (
            <li key={pokemon.url}>
              <Link href={`/pokemon${getIdFromUrl(pokemon.url)}`}>
                <a>{pokemon.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
