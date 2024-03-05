#!/bin/bash
pid=$1
logFileName=be-$(date +"%Y-%m-%d-%H:%M:%S")
RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "The current date is $(date +"%Y-%m-%d-%H:%M:%S") UTC"
echo -e "${YELLOW}Pulling latest commits from GitHub...${NC}"
git pull
echo -e "${GREEN}Pull complete${NC}"

# Frontend
cd ~/FarmFolio/fe
echo -e "${YELLOW}Building Frontend...${NC}"
{ # try
    npm install && npm run build &&
    echo -e "${GREEN}Build complete${NC}"
} || { # catch
    echo -e "${RED}ERROR while installing dependencies or running build command!${NC}" 
}

echo -e "${YELLOW}Deploying Frontend...${NC}"
sudo rm -r /var/www/html/dist/
{ # try
    sudo mv dist/ /var/www/html/ &&
    echo -e "${GREEN}Deploy complete${NC}"
} || { # catch
    echo -e "${RED}ERROR while replacing previous deployment!${NC}" 
}

# Backend
cd ~/FarmFolio/be
echo -e "${YELLOW}Deploying Backend...${NC}"
echo -e "${YELLOW}Backend output will be stored in /home/ec2-user/logs/${logFileName}${NC}"

kill -INT $pid
{ # try
    npm install && node index.js > /home/ec2-user/logs/$logFileName &&
    echo -e "${GREEN}Backend is live${NC}"
} || { # catch
    echo -e "${RED}ERROR while installing dependencies or launching node!${NC}" 
}

# For the love of god why doesnt this command work. It should work to start node inside a new screen
# screen -md bash -c 'node index.js > /home/ec2-user/logs/$logFileName'

# appending & to the node command to start node as a child process also did not solve the problem of the script not running any commands after node index.js
