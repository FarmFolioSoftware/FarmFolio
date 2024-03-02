#!/bin/bash
pid=$1
git pull

# Backend
kill -INT $pid
npm install
logFileName=log-$(date +"%Y-%m-%d-%H:%M:%S")
touch /home/ec2-user/logs/$logFileName
node index.js > /home/ec2-user/logs/$logFileName

# Frontend
cd /home/ec2-user/FarmFolio/fe
sudo systemctl stop httpd
npm run build
sudo mv dist/ /var/www/html/
sudo systemctl start httpd