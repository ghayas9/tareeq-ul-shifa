import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#128E7C',
        secondary: '#38C95C',
        textColor: '#616161',
        normalGreen: '#38C95C',
        customTeal: '#D6E8E5',
        customGray: '#616161',
        CloudGray: '#D9D9D9',
        DimGray: '#404040',
        success: '#5CB338',
        CoolGray: '#9E9E9E',
        FieryRed: '#E22134',
        Aqua: '#d0e8e5',
        SoftGray: '#EEEEEE',
        gr1: '#38C95C',
        gr2: '#128E7C',
        DarkAsh: '#333333',
        LightGray: '#F8F8F8',
        tableColor: '#5389607',

        borderColor: 'linear-gradient(90deg, #38C95C 0%, #128E7C 100%)',
      },
      // fontFamily: {
      //   robotoSlab: ['var(--font-roboto-slab)', 'serif'],
      //   poppins: 'var(--font-poppins), sans-serif',
      //   libre: ['var(--font-libre)', 'Georgia', 'serif'],
      // },
      fontFamily: {
        sans: ['var(--font-libre)', 'Georgia', 'serif'],
      },

      animation: {
        float: 'float 3s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.border-gradient': {
          borderWidth: '2px',
          borderImage: 'linear-gradient(90deg, #38C95C 0%, #128E7C 100%)',
          borderImageSlice: '1',
        },
      });
    },
  ],
} satisfies Config;
