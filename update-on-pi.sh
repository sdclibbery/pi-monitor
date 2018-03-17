#!/bin/bash
kill -9 `ps aux | grep 'pi-monitor' | awk '{print $2}'`
git pull
npm install
kill -9 `ps aux | grep 'pi-monitor' | awk '{print $2}'`
