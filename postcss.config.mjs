/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {
      config: "./tailwind.config.ts",
      css: "./src/styles/globals.css",
      content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      ],

    },
    autoprefixer: {
      overrideBrowserslist: ["last 2 versions", "> 1%", "not dead"],
      grid: true,
      flexbox: true,
      autoprefixer: {
        grid: true,
        flexbox: true,
      },
      cascade: true,
      add: true,
      remove: true,
      support: true,
      flexbox: true,
      grid: true,
      flexbox: true,
      grid: true,
    },
  },
};

export default config;
