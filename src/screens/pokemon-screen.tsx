import Link from 'next/link'
import * as React from 'react'

import { getIdFromUrl } from 'src/utils'

type IProps = { pid: string }

async function getPokemon(pid) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pid}/`
  const pokeData = await (await fetch(url)).json()

  const speciesUrl = pokeData.species.url

  let color = 'gray'
  try {
    const species = await (await fetch(speciesUrl)).json()
    color = species.color.name
  } catch (error) {
    console.error(error)
  }

  const pokemon = {
    name: pokeData.name,
    types: pokeData.types.map(({ type }) => type),
    image: pokeData.sprites.other['official-artwork'].front_default,
    color,
  }

  return pokemon
}

export default function PokemonScreen({ pid }: IProps) {
  const [pokemonData, setPokemonData] = React.useState({
    name: '',
    types: [],
    image: '',
    color: '',
  })
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getPokemon(pid).then((pokemon) => {
      setPokemonData(pokemon)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return loadingElement
  }

  return (
    <>
      <div className="mt-8 inline-flex flex-col items-center">
        <img
          src={pokemonData.image}
          alt={pokemonData.name}
          className="h-56 w-56 motion-safe:animate-bounce2-slow"
        />

        <div className="mt-2 h-4 w-40 bg-gray-500 opacity-50 rounded-full filter blur"></div>
      </div>

      <h1
        className={`mt-8 text-4xl text-${pokemonData.color}-700 font-light capitalize`}
      >
        {pokemonData.name}
      </h1>

      <p className="mt-4 mb-2 text-gray-600 text-sm">
        👇 Check out the other pokemons that share the same type
      </p>
      <ul>
        {pokemonData.types.map((type) => {
          return (
            <li key={type.url}>
              <Link href={`/type${getIdFromUrl(type.url)}`}>
                <a
                  className={`capitalize text-xl text-${pokemonData.color}-700 hover:text-${pokemonData.color}-800`}
                >
                  {type.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

const loadingElement = (
  <>
    <div className="mt-8 inline-flex flex-col items-center">
      <div className="h-56 w-56 bg-gray-200 animate-pulse rounded-full" />

      <div className="mt-2 h-4 w-40 bg-gray-500 opacity-50 rounded-full filter blur"></div>
    </div>

    <div className="mt-8 h-10 w-40 bg-gray-300" />

    <div className="mt-4 mb-2 bg-gray-300 h-5 w-96"></div>
    <ul>
      {Array(2)
        .fill(0)
        .map((_, index) => (
          <li key={index} className="h-6 mb-1 w-14 bg-gray-400" />
        ))}
    </ul>
  </>
)
