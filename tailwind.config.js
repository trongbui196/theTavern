/** @type {import('tailwindcss').Config} */
export default {

  mode:'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      
      fontFamily: {
        medieval: ['MedievalSharp', 'cursive'],
        uncial: ['Uncial Antiqua', 'serif'],
      },
     animation: {
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
      },
    },
  },
  plugins: [
    
  ],
}