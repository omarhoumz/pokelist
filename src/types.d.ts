type PokemonData = {
  results: any[]
  next: string | null
  previous: string | null
}

type StateType = {
  pokemons: any[]
  nextUrl: string
  prevUrl: string
  error: any | null
  loading: boolean
}
