import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Maps to the Inter variable
        sans: ["var(--font-sans)", "sans-serif"],
        // Maps to the Plus Jakarta Sans variable
        heading: ["var(--font-heading)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
