#!/bin/bash
if [[ ! `netstat -tulpn 2>/dev/null | grep 8000 | grep node` ]]; then
  cd /home/application/pi-monitor
  node index.js >> pi-monitor.log 2>&1
fi
