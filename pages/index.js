import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Poke List</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🐨</text></svg>"
        />
      </Head>
      <h1>Poke List</h1>
      <h2>Home</h2>
    </div>
  )
}
