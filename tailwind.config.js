const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1650px",
      },
      translate: {
        20: "20vh",
      },
      width: { 100: "100px", 200: "200px" },
      height: {
        100: "100px",
        500: "500px",
      },

      borderRadius: {
        "integrate-btn": "0px 50% 0px 100px;",
        50: "50%;",
      },
      boxShadow: {
        "card-featured": "0px 3px 5px rgba(0, 0, 0, 0.1)",
        card: "0 6px 12px -2px rgb(50 50 93 / 25%), 0 3px 7px -3px rgb(0 0 0 / 30%)",
      },
      backgroundImage: {
        "card-featured-metadata":
          "linear-gradient( 0deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0) 100% )",
      },
      colors: {
        "theme-color": "#19113c",
        "primary-color": "#1abde7",
        "primary-color-darker": "#1595b5",
        "secondary-color": "#f1f8ff",
        "border--primary-color": "rgba(0, 0, 0, 0.3)",
      },
      blur: {
        "bl-1": "1px",
      },
      textColor: {
        primary: "#ffffff",
        secondary: "#0366d6",
        "secondary-lighter": "#0365d69f",
      },
      transitionDuration: {
        "0.25s": ".25s",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hide": {
          /* IE and Edge */
          "-ms-overflow-style": "none",

          /* Firefox */
          "scrollbar-width": "none",

          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      });
    }),
  ],
};
