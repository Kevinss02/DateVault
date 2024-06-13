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
        'custom-darker-pastel': '#FFC0B3', // Ajustado a un tono más oscuro
        'custom-darker-pink': '#E078A9', // Ajustado a un tono más oscuro
        'custom-darker-purple': '#745A8C', // Ajustado a un tono más oscuro
      },
      spacing: {
        46: '184px',
        45: '180px',
        30: '120px',
        29: '116px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
