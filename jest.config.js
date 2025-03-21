
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: [
    './src/components/media/upload/hooks/__tests__/setup.ts'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/'
  ]
};
