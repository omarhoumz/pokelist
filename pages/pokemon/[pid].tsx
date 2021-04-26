import { useRouter } from 'next/router'

import PageLayout from '@/components/page-layout'
import PokemonScreen from 'src/screens/pokemon-screen'

export default function PokePage() {
  const router = useRouter()

  const {
    query: { pid },
  } = router

  if (!pid) {
    return <div>No pokemons found</div>
  }

  return (
    <PageLayout title="The poke">
      <PokemonScreen pid={pid as string} />
    </PageLayout>
  )
}
