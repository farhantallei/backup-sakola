/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
    fontFamily: {
      sans: [
        'Manrope VF',
        'Manrope',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
      ],
    },
    extend: {
      animation: {
        'navigation-progress-finish': 'np-opacity 1s 150ms forwards',
        'navigation-progress-after':
          'np-after-opacity 200ms forwards, np-after-shadow 2s 4s forwards',
      },
      keyframes: {
        'np-opacity': {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        'np-after-opacity': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'np-after-shadow': {
          '0%': { 'box-shadow': '0 0 15px, 0 0 5px' },
          '100%': { 'box-shadow': '0 0 3px, 0 0 1px' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
