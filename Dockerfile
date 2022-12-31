FROM node:16-alpine3.17
WORKDIR /stock-mgt
COPY package*.json ./
#COPY package-lock.json ./
RUN npm install -g npm@9.2.0
RUN npm install --force

COPY . .
CMD ["npm", "start"]

