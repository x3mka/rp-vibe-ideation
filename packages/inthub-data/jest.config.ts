export default {
  displayName: '@rp-vibe-ideation/inthub-data',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../coverage/packages/inthub-data',
  testEnvironment: 'node',
};
