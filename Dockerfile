FROM node:latest
RUN npm install nodemon -g

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
ENV NODE_PATH=/tmp/node_modules

WORKDIR /opt/app
ADD . /opt/app



EXPOSE 3001
EXPOSE 3000

CMD ["npm", "run", "dev"]
