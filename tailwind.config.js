/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:           '#09090B',
        panel:        '#111113',
        input:        '#18181B',
        inputActive:  '#1F1F23',
        line:         '#27272A',
        lineSubtle:   '#1C1C1F',
        lineBright:   '#3F3F46',
        brand:        '#F97316',
        brandText:    '#FFFFFF',
        sub:          '#A1A1AA',
        faint:        '#52525B',
        accent:       '#FACC15',
        ok:           '#22C55E',
        err:          '#EF4444',
      },
    },
  },
  plugins: [],
};
