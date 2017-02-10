FROM node:latest
# Install PM2
RUN npm install -g pm2

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
ENV NODE_PATH=/tmp/node_modules

WORKDIR /opt/app
ADD . /opt/app



EXPOSE 3001
EXPOSE 3000

# Run app