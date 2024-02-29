#!/bin/bash
pid=$1
git pull
kill -INT $pid
npm install
logFileName=log-$(date +"%Y-%m-%d-%H:%M:%S")
touch /home/ec2-user/logs/$logFileName
node index.js > /home/ec2-user/logs/$logFileName
