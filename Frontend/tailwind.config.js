/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': 'rgb(var(--color-bg-primary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['Gilroy', 'Segoe UI', 'sans-serif'],
        body: ['Proxima Nova', 'Segoe UI', 'sans-serif'],
        signature: ['Photograph Signature', 'Brush Script MT', 'cursive'],
      },
      borderRadius: {
        md: 'var(--radius-md)',
      },
      transitionTimingFunction: {
        standard: 'var(--ease-standard)',
      },
    },
  },
  plugins: [],
}