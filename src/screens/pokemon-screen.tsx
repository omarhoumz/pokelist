import Link from 'next/link'
import * as React from 'react'

import { getIdFromUrl } from 'src/utils'

function getEvolutionChain(chain) {
  return chain.reduce((accu, curr) => {
    const currentSpecie = curr.species

    let childEvolutions =
      curr.evolves_to.length > 0 ? getEvolutionChain(curr.evolves_to) : []

    return [...accu, currentSpecie, ...childEvolutions]
  }, [])
}

async function getPokemon(pid) {
  const url = `https://pokeapi.co/api/v2/pokemon/${pid}/`
  const pokeData = await (await fetch(url)).json()

  const speciesUrl = pokeData.species.url

  let evolutionChainUrl = ''
  let color = 'gray'
  try {
    const species = await (await fetch(speciesUrl)).json()
    color = species.color.name
    evolutionChainUrl = species.evolution_chain.url
  } catch (error) {
    console.error(error)
  }

  let evolutions = []
  try {
    const evolutionChain = await (await fetch(evolutionChainUrl)).json()
    evolutions = getEvolutionChain([evolutionChain.chain])
  } catch (error) {
    console.error(error)
  }

  const pokemon = {
    name: pokeData.name,
    types: pokeData.types.map(({ type }) => type),
    image: pokeData.sprites.other['official-artwork'].front_default,
    color,
    evolutions,
  }

  return pokemon
}

type IProps = { pid: string }
export default function PokemonScreen({ pid }: IProps) {
  const [pokemonData, setPokemonData] = React.useState({
    name: '',
    types: [],
    image: '',
    color: '',
    evolutions: [],
  })
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    getPokemon(pid).then((pokemon) => {
      setPokemonData(pokemon)
      setLoading(false)
    })
  }, [pid])

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

      <ul>
        {pokemonData.evolutions.map((evolution) => {
          const id = getIdFromUrl(evolution.url)

          return (
            <li key={evolution.url}>
              <Link href={`/pokemon${id}`}>
                <a
                  className={`capitalize text-2xl text-${pokemonData.color}-600 hover:text-${pokemonData.color}-800`}
                >
                  {evolution.name}{' '}
                  {id.substr(1, id.length - 2) !== pid ? null : (
                    <span className="text-sm text-blue-400">
                      👈 we are here
                    </span>
                  )}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>

      <p className="mt-4 mb-2 text-gray-600 text-sm">
        👇 Check out the other pokemons that share the same{' '}
        <span className="font-bold">type</span>
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
