import Link from 'next/link'

export default function PageHeader() {
  return (
    <header className="p-2 md:w-full md:max-w-3xl md:mx-auto">
      <h1 className="text-2xl font-light">Pokelist</h1>

      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
      </nav>
    </header>
  )
}
