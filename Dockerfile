FROM node
MAINTAINER Alex Pelavin

RUN apt-get update && apt-get install -y libav-tools

RUN mkdir /bot-lazzer
WORKDIR /bot-lazzer

COPY package.json /bot-lazzer/
RUN npm install

COPY . /bot-lazzer/

CMD ["npm", "start"]
