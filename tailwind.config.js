/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "var(--brand-50, #f0fdf4)",
          100: "var(--brand-100, #dcfce7)",
          200: "var(--brand-200, #bbf7d0)",
          300: "var(--brand-300, #86efac)",
          400: "var(--brand-400, #4ade80)",
          500: "var(--brand-500, #22c55e)",
          600: "var(--brand-600, #16a34a)",
          700: "var(--brand-700, #15803d)",
          800: "var(--brand-800, #166534)",
          900: "var(--brand-900, #14532d)",
          primary: "var(--brand-primary, #0f766e)",
          accent: "var(--brand-accent, #0284c7)",
          surface: "var(--brand-surface, #ffffff)",
          bg: "var(--brand-bg, #f8fafc)",
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
