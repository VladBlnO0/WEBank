FROM node:17-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install react-router-dom
RUN npm install gh-pages --save-dev

ENV ESLINT_NO_CACHE=true

RUN chown -R node:node /app/node_modules

COPY . .
EXPOSE 3000
CMD ["npm", "start"]