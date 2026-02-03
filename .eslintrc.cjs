/** @format */

module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    // Prettier 충돌 방지 + eslint에서 prettier 규칙 적용
    "plugin:prettier/recommended",
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: {
    react: { version: "detect" },
    // import 경로 해석 + @ alias 인식
    "import/resolver": {
      alias: {
        map: [["@", "./src"]],
        extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      },
    },
  },
  rules: {
    "react/react-in-jsx-scope": "off", // React 17+ 필요없음
    "prettier/prettier": "error",
  },
};
