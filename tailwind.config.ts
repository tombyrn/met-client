import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config: object = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Times New Roman", "sans-serif"],
      serif: ["Times New Roman", "sans-serif"],
      body: ["Times New Roman", "sans-serif"],
    },
  },
  plugins: [],
});
export default config;
