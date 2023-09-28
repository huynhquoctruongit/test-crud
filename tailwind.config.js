/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

const colors = require("tailwindcss/colors");
export default {
  plugins: [
    require("@tailwindcss/line-clamp"),
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            primary: "#F15F22",
            blue: "#C12525",
            secondary: "#ffefe7",
            "primary-foreground": "white",
          }, // light theme colors
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {}, // dark theme colors
        },
      },
    }),
  ],

  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      transparent: "transparent",
      current: "currentColor",
      white: "#FFFFFF",
      black: "#242424",
      primary1: "#F99D1C",
      primary2: "#F15F22",
      neu1: "#22313F",
      neu2: "#808890",
      neu3: "#B2B7BC",
      neu4: "#E5E7E8",
      neu5: "#F2F3F4",
      neu6: "#FFFFFF",
      neu7: "#FFFDF3",
      neu8: "#178CFF",
      green1: "#23AF6E",
      yellow: "#FFBF42",
      red: "#FD3535",
      secondary: "#eee8e3",
      pure: "#7635c8",
      blurgray: "#2b2f8e",
      blurlight: "#3369f4",
      graydefault: "#f7f7f7",
      greenpastel: "#ebfdef",
      orangepastel: "#ffefe7",
      bluepastel: "#e8eff9",
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
    },
    extend: {},
  },
};
