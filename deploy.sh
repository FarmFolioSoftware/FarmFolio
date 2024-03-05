#!/bin/bash
pid=$1
logFileName=be-$(date +"%Y-%m-%d-%H:%M:%S")
git pull

# Frontend
pwd
cd ~/FarmFolio/fe
pwd
npm install
pwd
npm run build
pwd
sudo rm -r /var/www/html/dist/
pwd
sudo mv dist/ /var/www/html/

# Backend
pwd
cd ~/FarmFolio/be
kill -INT $pid
pwd
npm install
pwd
node index.js > /home/ec2-user/logs/$logFileName # & # running node as a child process also did not work
# For the love of god why doesnt this command work. It should work
# screen -md bash -c 'node index.js > /home/ec2-user/logs/$logFileName'
pwd
