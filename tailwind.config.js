/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'adrar-green': '#22c55e',
        'adrar-dark-green': '#16a34a',
        'adrar-light-green': '#86efac',
        'adrar-dark-gray': '#374151',
      },
    },
  },
  plugins: [],
};