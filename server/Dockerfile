FROM node:16.17.1-alpine3.15

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

VOLUME [ "/app/node_modules" ]

CMD ["npm", "run", "migrate-and-start"]