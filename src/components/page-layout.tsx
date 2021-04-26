import Head from 'next/head'
import * as React from 'react'

type IProps = {
  children: React.ReactNode
  title?: string
}

export default function PageLayout({ children, title }: IProps) {
  return (
    <div>
      <Head>
        <title>{title ? `${title} - ` : ''}Poke List</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🐨</text></svg>"
        />
      </Head>
      {children}
    </div>
  )
}
