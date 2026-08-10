module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#eef2ff',
          200: '#e1e8ff',
          500: '#6366f1'
        }
      },
      boxShadow: {
        soft: '0 6px 18px rgba(15, 23, 42, 0.06)'
      }
    }
  },
  plugins: []
}
