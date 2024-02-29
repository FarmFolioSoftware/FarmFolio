#!/bin/bash
pid=$1
git pull
kill -INT $pid
npm install
node index.js
