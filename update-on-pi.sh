#!/bin/bash

kill -9 `ps aux | grep 'node index.js' | awk '{print $2}' | tail -n1`
git pull
npm install
kill -9 `ps aux | grep 'node index.js' | awk '{print $2}' | tail -n1`
