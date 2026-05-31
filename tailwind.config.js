/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Lora', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: 'var(--primary)',
          accent: 'var(--accent)',
          bg: 'var(--bg)',
          bg2: 'var(--bg2)',
          card: 'var(--card)',
          text: 'var(--text)',
          muted: 'var(--muted)',
          border: 'var(--border)',
        },
      },
    },
  },
  plugins: [],
}
