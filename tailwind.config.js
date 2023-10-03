/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      height: {
        thin: '0.1rem',
      },
      colors: {
        primary:'#292f46',
        secondary:'#6f4ef2',
        third: '#004590',
        headtxt: '#333333',
        secondarytxt: '#666',
        darkbg: '#222222',
        darkcomp: '#333333',
        lighttxt:'#333333',
        darktxt:'#FFFFFF',
        lightbg: '#FFFFFFF',
      },
      fontFamily: {
        'Roboto': ['Roboto', 'san-serif']
      },
      fontSize: {
        '2xs': '0.65rem'
      }
    },
  },
  plugins: [],
}
