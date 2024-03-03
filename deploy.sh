#!/bin/bash
pid=$1
logFileName=be-$(date +"%Y-%m-%d-%H:%M:%S")
git pull

# Backend
pwd
kill -INT $pid
pwd
npm install
pwd
node index.js > /home/ec2-user/logs/$logFileName &
# For the love of god why doesnt this command work. It should work
# screen -md bash -c 'node index.js > /home/ec2-user/logs/$logFileName'
pwd
cd ..

# Frontend
pwd
cd fe
pwd
npm install
pwd
npm run build
pwd
sudo rm -r /var/www/html/dist/
pwd
sudo mv dist/ /var/www/html/
pwd
