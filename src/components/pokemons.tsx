import Link from 'next/link'

import { getIdFromUrl } from 'src/utils'

export default function Pokemons({ pokemons }) {
  return pokemons.map((pokemon) => {
    return (
      <li key={pokemon.url}>
        <Link href={`/pokemon${getIdFromUrl(pokemon.url)}`}>
          <a
            className={`flex items-center h-full p-4 bg-blue-200 text-blue-700 ${
              pokemon.name.length < 15
                ? 'text-2xl'
                : pokemon.name.length < 21
                ? 'text-xl'
                : 'text-sm'
            } font-bold capitalize rounded shadow transition-shadow duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none`}
          >
            {pokemon.name}
          </a>
        </Link>
      </li>
    )
  })
}
