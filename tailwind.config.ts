/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "380px",
        md: "420px",
        lg: "680px",
        // or maybe name them after devices for `tablet:flex-row`
        tablet: "1024px",
      },
      fontFamily: {
        // Inter
        "inter-light": ["inter-light"],
        "inter-regular": ["inter-regular"],
        "inter-medium": ["inter-medium"],
        "inter-semibold": ["inter-semibold"],
        "inter-bold": ["inter-bold"],
        "inter-black": ["inter-black"],
        "manrope-bold": ["manrope-bold"],
        "manrope-extrabold": ["manrope-extrabold"],
        "manrope-semibold": ["manrope-semibold"],
      },
      colors: {
        // Design colors
        background: "#F7FAF9",
        primary: "#2F9C8F",
        wellComeBlack: "#010906",
        blackish: "#000000EB",
        dark: "#1F3230",

        progress: {
          green: "#FFA82F",
          yellow: "#FFF0DA",
        },

        grayBg: "#F0F4F3",

        card: "#FFFFFF",

        subscription: "#D4AF37",
        yellow: "#FFA82F",
        orange10: "#FF6B351A",
        orange: "#FF6B35",

        error: "#D92D20",
        success: "#00C897",
        green: "#34C759",
        pending: "#FF9F0A",

        text: {
          primary: "#000000",
          secondary: "#6B7280",
        },
      },
    },
  },
  plugins: [],
}
