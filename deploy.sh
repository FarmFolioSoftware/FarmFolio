#!/bin/bash
pid=$1
logFileName=be-$(date +"%Y-%m-%d-%H:%M:%S")
git pull

# Frontend
cd fe
npm install
npm run build
sudo rm -r /var/www/html/dist/
sudo mv dist/ /var/www/html/
cd ..

# Backend
cd be
kill -INT $pid
npm install
node index.js > /home/ec2-user/logs/$logFileName
cd ..