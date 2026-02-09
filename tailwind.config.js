/**
 * @format
 * @type {import('tailwindcss').Config}
 */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        yfavorite: ['"YFavorite"', "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
