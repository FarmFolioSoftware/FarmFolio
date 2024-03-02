#!/bin/bash
pid=$1
logFileName=be-$(date +"%Y-%m-%d-%H:%M:%S")
git pull

# Backend
cd be
kill -INT $pid
npm install
node index.js > /home/ec2-user/logs/$logFileName
cd ..

# Frontend
cd fe > /home/ec2-user/logs/be-$logFileName
npm install > /home/ec2-user/logs/be-$logFileName
npm run build > /home/ec2-user/logs/be-$logFileName
sudo rm -r /var/www/html/dist/ > /home/ec2-user/logs/be-$logFileName
sudo mv dist/ /var/www/html/ > /home/ec2-user/logs/be-$logFileName
cd .. > /home/ec2-user/logs/be-$logFileName