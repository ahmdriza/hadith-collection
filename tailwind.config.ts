import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#f0fdf4', // Very light green (Backgrounds)
                    100: '#dcfce7', // Light green (Sidebar hover)
                    600: '#16a34a', // Main Green (Buttons/Icons)
                    700: '#15803d', // Dark Green (Text)
                    800: '#166534', // Deep Green (Headings)
                }
            },
            fontFamily: {
                arabic: ['var(--font-amiri)', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
