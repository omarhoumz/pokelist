import Link from 'next/link'
import * as React from 'react'

import { getIdFromUrl } from 'src/utils'

type IProps = { tid: string }

export default function TypeScreen({ tid }: IProps) {
  const [typeData, setTypeData] = React.useState({
    id: 0,
    name: '',
    moves: [],
    pokemon: [],
  })

  React.useEffect(() => {
    async function getType() {
      const url = `https://pokeapi.co/api/v2/type/${tid}/`
      const { name, moves, pokemon, id } = await (await fetch(url)).json()

      const poke = {
        id,
        name,
        moves,
        pokemon: pokemon.map(({ pokemon }) => pokemon),
      }

      setTypeData(poke)
    }

    getType()
  }, [])

  return (
    <div>
      <h1 style={{ textTransform: 'capitalize' }}>{typeData.name}</h1>

      <h2>Pokemons</h2>
      <ul>
        {typeData.pokemon.map((pokemon) => {
          return (
            <li key={pokemon.url}>
              <Link href={`/pokemon${getIdFromUrl(pokemon.url)}`}>
                <a>{pokemon.name}</a>
              </Link>
            </li>
          )
        })}
      </ul>

      <h2>Moves</h2>
      <ul>
        {typeData.moves.map((move) => (
          <li key={move.url}>{move.name}</li>
        ))}
      </ul>
    </div>
  )
}
