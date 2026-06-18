/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './index.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
 theme: {
    extend: {
      colors: {
        // Surfaces
        bg:      '#0D0D0D', // app background
        surface: '#1A1A1A', // card / surface
        elevated:'#222222', // elevated surface

        // Input-specific (used directly by FormFields.tsx)
        input:       '#1A1A1A', // default input background
        inputActive: '#1A1A1A', // focused input background (bg stays flat; border signals focus)

        // Borders / dividers
        line:       '#333333', // default border
        lineBright: '#AAFF00', // focused border (accent)
        lineSubtle: '#222222', // hairline / divider

        // Text
        sub:   '#AAAAAA', // secondary text / labels
        faint: '#777777', // helper / tertiary text

        // Accent
        brand:     '#AAFF00', // CTA / accent green
        brandDark: '#88CC00', // pressed/hover state for accent
      },
    },
  },
  plugins: [],
};


