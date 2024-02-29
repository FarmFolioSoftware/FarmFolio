#!/bin/bash
screen -r

cd /home/ec2-user/FarmFolio/be
git pull
yarn
service express-hello-world restart