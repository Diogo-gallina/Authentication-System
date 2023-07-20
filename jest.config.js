// jest-e2e.json
{
  "moduleFileExtensions": ["ts", "tsx", "js", "jsx", "json", "node"],
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/$1",
    // Add other moduleNameMapper entries if necessary
  },
  "rootDir": ".",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverage": true,
  "collectCoverageFrom": ["**/*.(t|j)s", "!**/node_modules/**"],
  "coverageDirectory": "./coverage",
  "testEnvironment": "node",
  "preset": "ts-jest"
}
