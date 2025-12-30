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
                    50: '#f0fdf4',   // Very light green (Backgrounds)
                    100: '#dcfce7',  // Light green (Sidebar hover)
                    200: '#bbf7d0',  // Lighter green
                    300: '#86efac',  // Light green
                    400: '#4ade80',  // Medium-light green
                    500: '#22c55e',  // Medium green
                    600: '#16a34a',  // Main Green (Buttons/Icons)
                    700: '#15803d',  // Dark Green (Text)
                    800: '#166534',  // Deep Green (Headings)
                    900: '#14532d',  // Darkest green
                },
                secondary: {
                    50: '#fffbeb',   // Very light amber
                    100: '#fef3c7',  // Light amber
                    200: '#fde68a',  // Lighter amber
                    300: '#fcd34d',  // Light amber
                    400: '#fbbf24',  // Medium amber
                    500: '#f59e0b',  // Main amber
                    600: '#d97706',  // Dark amber
                    700: '#b45309',  // Darker amber
                    800: '#92400e',  // Deep amber
                    900: '#78350f',  // Darkest amber
                },
                success: {
                    50: '#f0fdf4',
                    500: '#22c55e',
                    600: '#16a34a',
                },
                warning: {
                    50: '#fffbeb',
                    500: '#f59e0b',
                    600: '#d97706',
                },
                error: {
                    50: '#fef2f2',
                    500: '#ef4444',
                    600: '#dc2626',
                },
            },
            fontFamily: {
                arabic: ['var(--font-amiri)', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
