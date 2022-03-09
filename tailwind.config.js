module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
      screen: {

      },
      aspectRatio: {
          auto: 'auto',
          square: '1 / 1',
          video: '16 / 9',
          1: '1',
          2: '2',
          3: '3',
          4: '4',
          5: '5',
          6: '6',
          7: '7',
          8: '8',
          9: '9',
          10: '10',
          11: '11',
          12: '12',
          13: '13',
          14: '14',
          15: '15',
          16: '16',
      },
      extend: {
          fontFamily: {
              sans: ['DM Sans', 'sans-serif'],
              great: "'Fredericka the Great', cursive",
              girl: "'Crafty Girls', cursive",
          },
          padding: {
              '1/3': '33.3333%',
              '2/3': '66.66667%',
          },
          colors: {
              green: {
                  DEFAULT: '#71B214',
              },
              gray: {
                  600: '#606060',
              },
              blue: {
                  DEFAULT: '#0000FF'
              },
              yellow: {
                  DEFAULT: '#FFFF00'
              }
          },
          spacing: {
              13: '3.25rem',
          },
          boxShadow: {
              primary: '0px 9.9px 21.6px rgba(136, 202, 41, 0.41)',
              big: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
              verybig: '0 50px 70px -25px rgba(0, 0, 0, 0.4)',
          },
          height: {
              '128': '32rem',
          },
          width: {
              '128': '32rem',
          },
          margin: {
              '128': '32rem',
          }
      },
  },
  variants: {
      extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
}