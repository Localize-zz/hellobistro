#!/bin/bash
sudo cp -a /home/ubuntu/config/ /home/ubuntu/hellobistro/
cd /home/ubuntu/hellobistro
sudo npm install
cd /home/ubuntu/hellobistro/client
sudo npm install
sudo ./node_modules/.bin/webpack --progress --colors --config webpack.config.js --bail
echo "install complete"