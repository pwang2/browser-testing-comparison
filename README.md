## Browser testing comparison
To make things simple, example code written as ES6+, only requires babel to
preprocessor it in the test.  

## Prerequisite 
npm>=5

## mocha with electon/jsdom
```
npx electron-mocha --require 'babel-core/register' --renderer ./test.js
npx mocha --require jsdom-global/register --require babel-core/register ./test.js
```
These 2 ways are basically quite similar, mocha as the main node process will
take care of the process spawning and test result redirection.  It looks mostly
like a black box. It is perfect for CI processing. NOTE: electron is NOT
headless, still need xvfb setup in CI.

Pros:
* black box like interface
* fast.
* As long as your code don't have external globals(which you should), you could
run your test spec in a glob manner.

Cons:
* Only fake browsers


### Karma
As a real test runner, Karma has its own CLI and a significant big eco system
of browser drivers, plugins, reporters. It provides the most capability but also
give people chance to hurt themselves with the its complexity. It could be run
both in local and CI with real browsers but mostly will requires a xvfb setup on
CI server.

```
npx karma start
```
Pros probably also Cons:
* we could setup test framework(tape, mocha, jasmine), pre-include libraries with
plugin, pre-processors (webpack, coffeescript). This gives us capabilities, but

Pros:
* karma run -- --grep=<pattern> allow us run only the spec we want but rarely
used.
* able to debug test code in favorite browser even with sourcemap.

Cons:
* Globals on test runtime. In the example, we have to remove the import
  statement from the test spec to reference it from brower window object instead
* modern module system make the file include confusing, need to hook with a
  bundle process still.
* hard to get things working for the first time. 
* no visibility to the preprocess, instrument process.
* mess up the dependency library interface in an undesired way. All
  karma-plugin-xxxx are in nature is evil IMHO.

### Testem
As an alternative to karma, same as karma Testem use socket.io to
tells our terminal what is happening in the browser. In CI mode, by default, it will run
your test in all installed browsers.

Testem tries to simplify the test life cycle a little bit. It has a clean
input(your test bundle),  it automatically injects testem client js and your
bundle in the page, nothing magical.

It provides global before after hooks to allow pre process the file, clean up.

```
npx testem ci
```

Pros:
* A simple, less error prone configuration interface.
* A good dev terminal interface

Cons:
* Similar to Karma requires to prepare a runtime HTML page.
* Need some [hack](https://github.com/testem/testem#running-browser-code-after-tests-complete) to get coverage report.

### Testling
Pipe Pipe Pipe!  Bundled preprocessed test js file is input to pipe to testling.
We don't need to setup too much.

```
sh testling.sh
```

Pros:
* Unix philosophy: one program do one thing well. Use with other substack tools
with Unix pipe
* Works with real browsers

Cons:
* Less popular.
* Mostly used with browserify. Webpack did not write bundled file to stdout.

## Conclusion:
Front end development has already be polluted with libraries, plugins, hacks. We
probable don't want this happens in the most simple scenario--proving code is
doing things correctly. Practice should be as simple as it any other problems we
solve. We only expect some input, process it with a runtime and expect seeing
the results. Unix philosophy is still shinning to me. Do one thing and Do it
well. We probably don't want a runtime to glue stuff together with a exhausted
configuration file which may make more mistake.

Maybe you already realize I am booing solutions like karma here. In general, I feel
vigilant when I see one buzzword (karma) to be connected with another
buzzword(webpack). This probably means the package has 2 or more upstream
dependencies and itself need to promise the compatibilities. Users either have
to be brave to ignore the peer-dependency warning, or install multiple version
of the same package.

Under the context of browser testing(E2E not included), given these facts:
* Bundling/preprocessing practice is normalized.
* Module system of JavaScript is prevalent everywhere. 
* Global States even in test spec should be avoided.
* Modern browsers are much more consistent nowadays. 
* Tools like babel and eslint could prevent us from browser compatible issues
  when we are writing the code.

We should be assured with a headless runtime(jsdom or chrome-headless). For
practice, we could use a shell script to glue files between the
bundler and test runners.








