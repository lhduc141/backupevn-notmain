/** @type {import('tailwindcss').Config} */
const variables = require('./src/themes/variables');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/routes/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontSize: {
        ...defaultTheme.fontSize,
        ...variables.fonts,
        xs: ['0.75rem', '1rem'],
        sm: ['0.875rem', '1.125rem'],
        base: ['1rem', '1.25rem'], //16px - 20px
        lg: ['1.125rem', '1.5rem'], //18px
        '0.5xl': ['1.375rem', '2.25rem'], //22px
        '2.5xl': ['1.625rem', '2.25rem'], //26px
        '3.5xl': ['2rem', '2.5rem'], //32px
        'header-title': ['1.625rem', '2.25rem']
      },
      borderRadius: {
        base: '5px'
      },
      colors: {
        ...variables.colorsBase
      },
      width: {
        13: '3.25rem', //52px;
        18: '4.5rem' //72px
      },
      height: {
        'float-label-height': 'var(--float-label-height)',
        13: '3.25rem', //52px
        18: '4.5rem' //72px
      },
      spacing: {
        'float-label-height': 'var(--float-label-height)',
        'float-label-padding': 'var(--float-label-padding)'
      },
      backgroundImage: {
        'agent-bg': "url('/src/assets/svg/agent-map-bg.svg')",
        'crm-bg': "url('/src/assets/svg/bg-image.svg')",
        'sidebar-bg': "url('/src/assets/svg/bg-sidebar.svg')",
        'dark-gradient': 'linear-gradient(to bottom, rgba(0, 0, 0, 0.65) 0%, transparent 100%)'
      },
      boxShadow: {
        active: 'inset 0 0 0 1px #1564E8',
        focus: 'inset 0 0 0 2px #1564E8',
        focusError: 'inset 0 0 0 2px #D1131D',
        dashboard: '0px 6px 16px #0000001F'
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'] // Định nghĩa font Oswald
      }
    }
  },
  darkMode: 'class',
  plugins: [],
  important: true
};
