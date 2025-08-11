FROM node:16

ENV MONGODB_CONNECTION_PROTOCOL mongodb+srv
ENV MONGODB_DB_NAME gha-demo1
ENV MONGODB_CLUSTER_ADDRESS  cluster0.krj9lox.mongodb.net
ENV MONGO_USERNAME rohinigajakosh
ENV MONGO_PASSWORD Rohini05

WORKDIR /app

COPY pakage*.json .

RUN npm install

copy . .

CMD ["npm", "start"]