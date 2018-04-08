#!/bin/bash

export LIVE=true; \
export PORT=3021; \
forever -w --watchDirectory ./dist start index.js \
