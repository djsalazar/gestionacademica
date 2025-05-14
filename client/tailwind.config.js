/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0056b3',
          light: '#3378c5',
          dark: '#003d80',
        },
        secondary: {
          DEFAULT: '#e7e7e7',
          light: '#f5f5f5',
          dark: '#d1d1d1',
        },
        success: {
          DEFAULT: '#388e3c',
          light: '#5cb860',
          dark: '#2e7d32',
        },
        error: {
          DEFAULT: '#d32f2f',
          light: '#e57373',
          dark: '#b71c1c',
        },
        warning: {
          DEFAULT: '#f39c12',
          light: '#ffb74d',
          dark: '#e67e22',
        },
        info: {
          DEFAULT: '#0288d1',
          light: '#4fc3f7',
          dark: '#01579b',
        },
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderRadius: {
        'card': '0.5rem',
      },
    },
  },
  plugins: [],
}