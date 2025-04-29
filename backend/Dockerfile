FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install -g nodemon
RUN npm install bcrypt
RUN npm install cors async-retry

RUN chown -R node:node /app
USER node

COPY . .

EXPOSE 4000

CMD ["node", "app.js"]