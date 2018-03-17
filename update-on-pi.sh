#!/bin/bash
kill -9 `ps aux | grep 'node.*pi-monitor' | awk '{print $2}' | head -n1`
git pull
npm install
kill -9 `ps aux | grep 'node.*pi-monitor' | awk '{print $2}' | head -n1`
./cron.sh
ps aux | grep 'node.*pi-monitor' | head -n1
