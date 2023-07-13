module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverage: true, // Habilita a coleta de cobertura de código
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/node_modules/**', // Exclui a pasta node_modules da cobertura
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
