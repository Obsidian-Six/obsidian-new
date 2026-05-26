/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,html}',
    './src/app/**/*.{js,ts,jsx,tsx,html}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui'],
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
        times: ['Times New Roman', 'Times', 'serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
};
