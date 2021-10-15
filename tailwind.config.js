module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors : {
        'background': process.env.BACKGROUND_COLOR || '#14274E',
        'accent': process.env.ACCENT_COLOR || '#394867'
      }
    },
  },
  variants: {
    extend: {
      brightness: ['hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
