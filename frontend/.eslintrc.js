module.exports = {
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-unused-vars": "off",
    // "no-unused-vars": [
    //   "warn",
    //   {
    //     "ignoreRestSiblings": true,
    //     "destructuredArrayIgnorePattern": "[A-Z]",
    //     // "caughtErrors": "none"
    //   }
    // ]
  }
}