/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'spin-slower': 'spin 50s linear infinite'
      },
      colors: {
        beige: '#ffebc9',
        tahiti: {
        100: '#cffafe',
        200: '#a5f3fc',
        300: '#67e8f9',
        400: '#22d3ee',
        500: '#06b6d4',
        600: '#0891b2',
        700: '#0e7490',
        800: '#155e75',
        900: '#164e63'
        }
      }
    }
  }
}

