#!/bin/bash

node_modules/.bin/webpack test.js dist/test.js 

cat dist/test.js | testling -x open --harness mocha

