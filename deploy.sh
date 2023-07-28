#!/bin/bash

# Navigate to the root directory of your Node.js application
cd /home/ec2-user/noCorsProxyServer

# Pull the latest changes from the master branch
git pull origin master

# Install/update dependencies (if needed)
npm install

npm run build

# Restart the Node.js application using PM2
pm2 restart all
