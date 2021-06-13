module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderColor: {
      },
      backgroundColor: {
        page: '#f3f4f6'
      },
      color: {
      },
      minWidth: {
        button: '230px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
