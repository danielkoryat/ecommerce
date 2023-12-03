export default {
    testEnvironment: 'jest-environment-node',
    setupFilesAfterEnv: ['./jest.setup.mjs'], // Use setupFilesAfterEnv instead of setupFiles
    transform: {
        '^.+\\.m?js$': 'babel-jest', // Make sure to include .mjs files here
    },
    transformIgnorePatterns: [
        '/node_modules/', // Only ignore node_modules by default
        // Do not ignore .mjs files, so remove the '^.+\\.mjs$' line
    ],
    moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'mjs'], // Add 'mjs' here
};