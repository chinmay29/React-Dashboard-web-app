FROM node:4.4.7-slim

ADD . /usr/src/app
WORKDIR /usr/src/app

RUN npm install --production

EXPOSE 7000

CMD [ "npm", "start" ]
