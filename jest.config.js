module.exports = {
    moduleNameMapper: {
        "\\.(css|scss)$": "identity-obj-proxy",
        "\\.(png|svg|pdf|jpg|jpeg)$": "<rootDir>/test/__mocks__/fileMock.js",
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.{js,jsx}'],
};