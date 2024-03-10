// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'], // Example: Use the 'Ubuntu' font with a fallback of generic sans-serif
        'noto': ['Noto Sans', 'sans-serif'], // Example: Use the 'Noto Sans' font with a fallback of generic sans-serif
      },
    },
  },
  plugins: [],
};
