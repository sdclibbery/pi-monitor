#!/bin/bash
if [[ ! `netstat -tulpn | grep 8000 | grep node` ]]; then
    sudo -u application node /home/application/pi-monitor/index.js >> /home/application/pi-monitor.log 2>&1
fi
