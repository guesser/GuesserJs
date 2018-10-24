module.exports = {
  "extends": "airbnb-base",
  "env": {
    "mocha": true
  },
  "rules": {
    "max-len": "off",
    "strict": 0,
    "no-unused-vars": [
      "error",
      {
        "varsIgnorePattern": "should|expect"
      }
    ]
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "parser": 'babel-eslint'
  }
};
