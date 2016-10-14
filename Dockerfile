FROM node:6.2-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN groupadd -r node \
&&  useradd -r -m -g node node \
&& npm i -g pm2

#COPY package.json /usr/src/app/
#RUN npm i --production \

COPY . /usr/src/app/
RUN rm /usr/src/app/.env \
&& chown -R node:node /usr/src/app
USER node

CMD node index.js
EXPOSE 3000