/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#004A99', // 로고의 딥 블루 색상 추정
                    red: '#E3000F',  // 로고의 레드 포인트 색상 추정
                }
            },
            fontFamily: {
                sans: ['Pretendard', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
