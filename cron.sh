#!/bin/bash
if [[ ! `netstat -tulpn 2>/dev/null | grep 8000 | grep node` ]]; then
    node /home/application/pi-monitor/index.js >> /home/application/pi-monitor.log 2>&1
fi
