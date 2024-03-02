#!/bin/bash
pid=$1
logFileName=be-$(date +"%Y-%m-%d-%H:%M:%S")
git pull

# Frontend
pwd
cd fe
pwd
npm install
pwd
npm run build
sudo rm -r /var/www/html/dist/
sudo mv dist/ /var/www/html/
pwd
cd ..

# Backend
pwd
cd be
kill -INT $pid
pwd
npm install
pwd
node index.js > /home/ec2-user/logs/$logFileName
cd ..