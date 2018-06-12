#!/bin/bash
pm2 start /home/ubuntu/hellobistro/server/app.js
pm2 start /home/ubuntu/hellobistro/client/server/app.js
echo "servers booted"