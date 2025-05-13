FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install
RUN npm install react-router-dom react-bootstrap bootstrap-icons
RUN npm install chart.js react-chartjs-2 chartjs-adapter-date-fns
RUN npm install @tinymce/tinymce-react
RUN npm install lucide-react

ENV ESLINT_NO_CACHE=true

RUN chown -R node:node /app/node_modules
USER node

COPY . .

EXPOSE 3000

CMD ["npm", "start"]