module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  },
  rules: [
    {
      test: /\.svg$/,
      use: ['@svgr/webpack']
    }
  ]
};
