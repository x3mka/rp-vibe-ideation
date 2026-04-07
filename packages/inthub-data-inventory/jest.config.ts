export default {
  displayName: '@rp-vibe-ideation/inthub-data-inventory',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../coverage/packages/inthub-data-inventory',
  testEnvironment: 'node',
};
