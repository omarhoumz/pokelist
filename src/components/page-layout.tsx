import Head from 'next/head'
import * as React from 'react'
import PageFooter from './page-footer'
import PageHeader from './page-header'

type IProps = {
  children: React.ReactNode
  title?: string
}

export default function PageLayout({ children, title }: IProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title ? `${title} - ` : ''}Poke List</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>🐨</text></svg>"
        />
      </Head>

      <PageHeader />

      <main className="p-2 md:w-full md:max-w-3xl md:mx-auto">{children}</main>

      <PageFooter />
    </div>
  )
}
