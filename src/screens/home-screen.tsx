import Link from 'next/link'
import * as React from 'react'

import { getIdFromUrl } from 'src/utils'

async function getPokemons<T>(url: string, cb: (data: T, error) => void) {
  if (!url) return
  let data: T = null
  let error = null
  try {
    data = await (await fetch(url)).json()
  } catch (e) {
    error = e
  }
  cb(data, error)
}

type PokemonData = {
  results: any[]
  next: string | null
}

export default function HomeScreen() {
  const [{ pokemons, nextUrl, error }, setState] = React.useState({
    pokemons: null,
    nextUrl: null,
    error: null,
  })
  const [pageNumber, setPageNumber] = React.useState(0)

  function updatePokemonData(data: PokemonData, error) {
    const { results, next } = data
    setState(({ pokemons }) => ({
      pokemons: [...(pokemons ?? []), ...results],
      nextUrl: next,
      error,
    }))
  }

  React.useEffect(() => {
    getPokemons<PokemonData>(
      'https://pokeapi.co/api/v2/pokemon',
      updatePokemonData,
    )
  }, [])

  React.useEffect(() => {
    getPokemons(nextUrl, updatePokemonData)
  }, [pageNumber])

  function handleClick() {
    setPageNumber((n) => n + 1)
  }

  if (error) {
    return <div>An error occured</div>
  }

  if (!pokemons) {
    return <div>Loading ...</div>
  }

  return (
    <div>
      <h1>Poke List</h1>
      <h2>Home</h2>
      <p>Showing {pokemons.length} pokemons</p>
      <p>Page number: {pageNumber + 1}</p>

      <ul>
        {pokemons.map((pokemon) => {
          return (
            <li key={pokemon.url}>
              <Link href={`/pokemon${getIdFromUrl(pokemon.url)}`}>
                <a>{pokemon.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>

      <button onClick={handleClick} type="button">
        Load more
      </button>
    </div>
  )
}
