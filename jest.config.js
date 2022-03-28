module.exports = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./src/tests/setupTests.ts'],
  collectCoverageFrom: [
    "src/**/*.{tsx}"
  ],
  transform: {
    '^.+\\.tsx?$': 'babel-jest',
  },
  roots: [
    "<rootDir>/src"
  ],
  globals: {
    "ts-jest": {
      "babelConfig": true
    },
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/node_modules/jest-css-modules"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ],
}