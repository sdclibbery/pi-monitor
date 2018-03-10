#!/bin/bash
if [[ ! `netstat -tulpn | grep 8000 | grep node` ]]; then
    invoke-rc.d sudo -u application node /home/application/pi-monitor/index.js >> /home/application/pi-monitor.log
fi
