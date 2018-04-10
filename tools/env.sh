#!/bin/bash

if [ $1 = "dev" ]
then
  export LIVE=false; \
  export PORT=3011; \
  export NODE_ENV=development; \
  export BABEL_ENV=development; \
elif [ $1 = "prod" ]
then
  export LIVE=false; \
  export PORT=3021; \
  export NODE_ENV=production; \
  export BABEL_ENV=development; \
elif [ $1 = "live" ]
then
  export LIVE=true; \
  export PORT=3021; \
  export NODE_ENV=production; \
  export BABEL_ENV=production; \
fi
