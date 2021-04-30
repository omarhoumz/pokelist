const colors = require('tailwindcss/colors')

const pokeColors = [
  'black',
  'blue',
  'brown',
  'gray',
  'green',
  'pink',
  'purple',
  'red',
  'white',
  'yellow',
]

function getClasses(colors, shades, props) {
  return colors
    .map((color) =>
      shades.map((shade) => props.map((prop) => `${prop}-${color}-${shade}`)),
    )
    .flat()
    .flat()
}

const pokeSafeList = getClasses(pokeColors, ['600', '700', '800'], ['text'])

module.exports = {
  purge: {
    content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: pokeSafeList,
    },
  },
  // mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brown: colors.orange,
        'white-400': colors.blueGray[200],
        white: '#fff',
      },
      keyframes: {
        bounce2: {
          '0%, 100%': { transform: 'translateY(-20px)' },
          '50%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'bounce2-slow': 'bounce2 4s ease-in-out infinite',
      },
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [],
}
