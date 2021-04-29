import Link from 'next/link'

export default function PageHeader() {
  return (
    <header className="flex items-baseline gap-x-4 p-2 md:w-full md:max-w-3xl md:mx-auto">
      <h1 className="text-2xl font-light">Pokelist</h1>

      <nav>
        <Link href="/">
          <a className="text-blue-600 border-b-2 border-transparent hover:text-blue-800 hover:border-current">
            Home
          </a>
        </Link>
      </nav>
    </header>
  )
}
