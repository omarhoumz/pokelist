## PokeList

### Technical and architectural choices:

- Nextjs: support all types of rendering, SSR, ISG, SSG, great DX and also supports Typescript out of the box which I'm also using.
- Tailwind provide utility classes without imposing styles and opinions
- `cypress`, `pages` and `public` are special folders that nextjs and cypress use. I like to put all my code in a `src` folder. In this project the `src` contains:
  - `components` folder: reusable components. They are in the top level because we don't have many, but we next them if we see fit.
  - `screens` folder contains the top level components for our pages (home, type, and pokemon)
  - `utils`: all our utilities, can also be nested and/or separated into files.

### Improvements & TODOs if allowed more time:

- Caching data. Now we always fetch data in each page transition. We sometimes fetch the same data more than one, especially in the home page. Caching would help reduce our network calls. Home page example:

  - Keep a page index of pokemon data

  ```js
    const pokemon = [[poke1, poke2, ...], [poke1, poke2, ...], [poke1, poke2, ...], ...]
  ```

  - Use a library for data fetching, example: [`SWR`](https://swr.vercel.app/) or [`React query`](https://react-query.tanstack.com/)

- More e2e tests and unit testing with [`Testing library`](https://testing-library.com/docs/react-testing-library/intro/)
