// jest.config.js
module.exports = {
    verbose: true,
    testURL: 'http://localhost/',
    testRegex: '\\.?(test|spec)\\.jsx?$',
    coverageReporters: ['lcov'],
    collectCoverage: false,
    setupFiles: ['./jestsetup.js'],
    coverageThreshold: {
        global: {
            branches: 0,
            functions: 0,
            lines: 0,
            statements: 0
        }
    },
    moduleFileExtensions: ['js', 'json', 'jsx'],
    testPathIgnorePatterns: [
        '/webpack/',
        '/node_modules/',
        '/server/',
        '/coverage/'
    ]
};
