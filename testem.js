module.exports = {
  framework: 'mocha+chai',
  src_files: ['dist/test.js'],
  before_tests: 'node_modules/.bin/webpack test.js dist/test.js',
  launch_in_ci: ['Chrome'],
  browser_args: {
    Chrome: [
      '--headless',
      '--disable-gpu',
      '--disable-translate',
      '--disable-extensions',
      '--remote-debugging-port=9222',
      '--remote-debugging-address=0.0.0.0',
      '--no-sandbox',
      '--user-data-dir=/tmp'
    ]
  }
};
