FROM node:latest
# Install PM2
RUN npm install -g pm2
RUN npm install -g concurrently

# Prepare app directory
RUN mkdir -p /opt/app/client
WORKDIR /opt/app

COPY package.json /opt/app
RUN npm install

# COPY client/package.json /opt/app/client
# RUN cd /opt/app/client && npm install --silent

ADD . /opt/app



EXPOSE 3001

# Run app
