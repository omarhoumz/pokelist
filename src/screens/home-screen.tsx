import Link from 'next/link'
import * as React from 'react'

import { getIdFromUrl } from 'src/utils'

async function getPokemons(dispatch: React.Dispatch<any>, url: string) {
  if (!url) return
  dispatch({ type: ACTIONS.CALL_API })
  try {
    const data: PokemonData = await (await fetch(url)).json()
    const { results: pokemons, next: nextUrl, previous: prevUrl } = data
    dispatch({ type: ACTIONS.SUCCESS, pokemons, nextUrl, prevUrl })
  } catch (error) {
    dispatch({ type: ACTIONS.CALL_API, error })
  }
}

const ACTIONS = {
  CALL_API: 'call-api',
  SUCCESS: 'success',
  ERROR: 'error',
}

function pokemonsReducer(state: StateType, action): StateType {
  switch (action.type) {
    case ACTIONS.CALL_API: {
      return { ...state, loading: true }
    }

    case ACTIONS.SUCCESS: {
      const { pokemons, nextUrl, prevUrl } = action
      return {
        ...state,
        error: null,
        pokemons,
        nextUrl,
        prevUrl,
        loading: false,
      }
    }

    case ACTIONS.ERROR: {
      return { ...state, error: action.error, pokemons: null, loading: false }
    }

    default: {
      throw new Error(`Unhadled action type (ts says this is a never case)`)
    }
  }
}

const initialState: StateType = {
  pokemons: null,
  nextUrl: null,
  prevUrl: null,
  error: null,
  loading: true,
}

export default function Home2() {
  const [state, dispatch] = React.useReducer(pokemonsReducer, initialState)
  const { pokemons, loading, error, nextUrl, prevUrl } = state

  React.useEffect(() => {
    getPokemons(dispatch, 'https://pokeapi.co/api/v2/pokemon')
  }, [])

  if (loading) {
    return <div>Loading ...</div>
  }

  if (error) {
    return <div>An error occured</div>
  }

  function handlePrevClick() {
    getPokemons(dispatch, prevUrl)
  }

  function handleNextClick() {
    getPokemons(dispatch, nextUrl)
  }

  return (
    <div>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-5">
        {pokemons.map((pokemon) => {
          return (
            <li key={pokemon.url}>
              <Link href={`/pokemon${getIdFromUrl(pokemon.url)}`}>
                <a className="block p-4 bg-blue-200 text-blue-700 text-3xl font-bold capitalize rounded shadow transition-shadow duration-300 hover:shadow-lg focus:shadow-lg focus:outline-none">
                  {pokemon.name}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>

      <button onClick={handlePrevClick} type="button" disabled={!prevUrl}>
        Previous Page
      </button>

      <button onClick={handleNextClick} type="button" disabled={!nextUrl}>
        Next Page
      </button>
    </div>
  )
}
