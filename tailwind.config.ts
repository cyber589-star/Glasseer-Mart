import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        secondary: '#3B2A20',
        'on-secondary': '#ffffff',
        background: '#FFFFFF',
        surface: '#FFFFFF',
        'surface-bright': '#F9F9F9',
        'surface-container-low': '#F3F3F3',
        'surface-container': '#EEEEEE',
        'surface-container-high': '#E8E8E8',
        'surface-container-highest': '#E2E2E2',
        'on-surface': '#1B1B1B',
        'on-surface-variant': '#4C4546',
        'outline-variant': '#E2E2E2',
        'outline': '#7E7576',
        'on-primary': '#FFFFFF',
        'primary-container': '#1B1B1B',
        'inverse-surface': '#303030',
        'inverse-on-surface': '#F1F1F1',
      },
      fontFamily: {
        serif: ['Libre Caslon Text', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['72px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'headline-lg': ['48px', { lineHeight: '1.2', fontWeight: '400' }],
        'headline-md': ['32px', { lineHeight: '1.3', fontWeight: '400' }],
        'headline-sm': ['24px', { lineHeight: '1.3', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-md': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label-caps': ['12px', { lineHeight: '1.0', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      spacing: {
        unit: '8px',
        'margin-mobile': '20px',
        'margin-desktop': '80px',
        gutter: '32px',
        'container-max': '1440px',
      },
      maxWidth: {
        'container-max': '1440px',
      },
      boxShadow: {
        'ambient': '0 20px 40px rgba(0, 0, 0, 0.08)',
        'ambient-lg': '0 30px 60px rgba(0, 0, 0, 0.12)',
        'ambient-xl': '0 40px 80px rgba(0, 0, 0, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.06)',
      },
      backdropBlur: {
        glass: '20px',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

export default config
