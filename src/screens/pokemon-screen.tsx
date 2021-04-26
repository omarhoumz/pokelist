import Link from 'next/link'
import * as React from 'react'

import { getIdFromUrl } from 'src/utils'

type IProps = { pid: string }

export default function PokemonScreen({ pid }: IProps) {
  const [pokemonData, setPokemonData] = React.useState({
    name: '',
    types: [],
    image: '',
  })

  React.useEffect(() => {
    async function getPokemon() {
      const url = `https://pokeapi.co/api/v2/pokemon/${pid}/`
      const pokeData = await (await fetch(url)).json()

      const poke = {
        name: pokeData.name,
        types: pokeData.types.map(({ type }) => type),
        image: pokeData.sprites.other['official-artwork'].front_default,
      }

      setPokemonData(poke)
    }

    getPokemon()
  }, [])

  return (
    <div>
      <h1 style={{ textTransform: 'capitalize' }}>{pokemonData.name}</h1>
      <img src={pokemonData.image} alt={pokemonData.name} width={230} />
      <ul>
        {pokemonData.types.map((type) => {
          return (
            <li key={type.url}>
              <Link href={`/type${getIdFromUrl(type.url)}`}>
                <a>{type.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
