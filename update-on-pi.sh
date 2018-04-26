#!/bin/bash

cd ../tradr
git pull
npm install
cd -
kill `ps aux | grep 'node index.js' | grep -v 'grep' | awk '{print $2}' | head -n1`
kill `ps aux | grep 'tradr/index.js' | grep -v 'grep' | awk '{print $2}' | head -n1`
git pull
npm install
kill `ps aux | grep 'node index.js' | grep -v 'grep' | awk '{print $2}' | head -n1`
