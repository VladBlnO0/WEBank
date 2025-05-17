FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install react-router-dom react-bootstrap bootstrap-icons lucide-react

ENV ESLINT_NO_CACHE=true

RUN chown -R node:node /app/node_modules
USER node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]