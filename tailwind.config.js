const { join } = require('path')

/** @return {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, './src/**/!(*.stories|*.spec).{ts,html}')],
  important: true,
  theme: {
    extend: {},
    container: {
      padding: '15px',
      screens: {
        xl: '1320px'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
