import { LoadingCards } from '@/components/loading-cards'
import Pokemons from '@/components/pokemons'
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
  const [loading, setLoading] = React.useState(true)

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
      setLoading(false)
    }

    getType()
  }, [])

  if (loading) {
    return loadingElement
  }

  return (
    <>
      <span className="uppercase text-sm font-black">type</span>
      <h1 className="capitalize text-3xl font-light leading-none mb-4">
        {typeData.name}
      </h1>

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5">
        <Pokemons pokemons={typeData.pokemon} />
      </ul>
    </>
  )
}

const loadingElement = (
  <>
    <span className="uppercase text-sm font-black">type</span>
    <div className="h-7 w-40 mb-4 bg-gray-400" />

    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5">
      <LoadingCards repeat={25} />
    </ul>
  </>
)
