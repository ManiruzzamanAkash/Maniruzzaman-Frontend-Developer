/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    media: false,
    theme: {
        extend: {
            minWidth: {
                36: '9rem',
                44: '11rem',
                56: '14rem',
                60: '15rem',
                80: '20rem',
            },
            screens: {
                xs: '480px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
                '2xl': '1536px',
            }
        },
        variants: {
            extend: {
                opacity: ['disabled'],
            },
        },
    },
    plugins: [],
};
