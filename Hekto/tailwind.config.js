/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.tsx",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0D0E43',
        'custom-pink': '#FB2E86',
        'custom-gray': '#8A8FB9',
        'gray-shade': '#F2F0FF',
        'purple-shade': '#F1F0FF',
        'blue-shade': '#151875',
        'shade-gray': '#ACABC3',
        'white-gray': '#F5F6F8',
        'pink-shade': '#FFF6FB',
        'light-blue-shade': '#EEEFFB',
        'gray-faint': '#B7BACB',
        'deep-blue': '#1A0B5B',
        'cream-white': '#F6F7FB',
        'purple': '#2F1AC4',
        'light-green': '#08D15F',
        'cultured-white': '#F7F7F7',
        'deep-pink': '#FB2448',
        'hard-yellow': '#FFA454',
        'deep-gray': '#72718F',
        'purple-main': '#7E33E0',
        'gray-deep-shade': '#E7E4F8',
        'dark-blue': '#101750',
        'off-gray': '#F6F5FF',
        'green-shade-light': '#EBF4F3',
        'new-gray': '#3F509E',
        'blue-extra': '#111C85',
        'light-gray': '#9295AA',
        'gray-icon': '#535399',
    },
  }
  },
  plugins: [],
}

