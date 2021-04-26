import { useRouter } from 'next/router'

import PageLayout from '@/components/page-layout'
import TypeScreen from 'src/screens/type-screen'

export default function TypePage() {
  const router = useRouter()

  const {
    query: { tid },
  } = router

  if (!tid) {
    return <div>No types found</div>
  }

  return (
    <PageLayout title="The type">
      <TypeScreen tid={tid as string} />
    </PageLayout>
  )
}
