export default {
  displayName: '@rp-vibe-ideation/ideation-registry',
  preset: '../../jest.preset.js',
  transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js'],
  coverageDirectory: '../../coverage/packages/ideation-registry',
  testEnvironment: 'node',
};
