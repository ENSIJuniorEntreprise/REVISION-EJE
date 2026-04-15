/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'eje-dark': '#1F212D',
        'eje-accent': '#2EA3DD',
        'eje-beige': '#E0DED2',
      },
      fontFamily: {
        heading: ['Gilroy', 'Segoe UI', 'sans-serif'],
        body: ['Proxima Nova', 'Segoe UI', 'sans-serif'],
        signature: ['Photograph Signature', 'Brush Script MT', 'cursive'],
      },
      borderRadius: {
        DEFAULT: '10px',
        md: 'var(--radius-md)',
      },
      keyframes: {
        'partners-marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'partners-marquee': 'partners-marquee 34s linear infinite',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
      },
    },
  },
  plugins: [],
}