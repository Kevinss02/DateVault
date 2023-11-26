/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-750': 'rgb(31, 41, 68)',
        'custom-pastel': '#FFDFD3',
        'custom-pink': '#F0A6CA',
        'custom-purple': '#9C89B8',
      },
    },
  },
  plugins: [],
};
