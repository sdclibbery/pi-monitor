#!/bin/bash

kill -9 `ps aux | grep 'node index.js' | grep -v 'grep' | awk '{print $2}' | head -n1`
git pull
npm install
kill -9 `ps aux | grep 'node index.js' | grep -v 'grep' | awk '{print $2}' | head -n1`
