# FROM node:16

# ENV MONGODB_CONNECTION_PROTOCOL mongodb+srv
# ENV MONGODB_DB_NAME gha-demo1
# ENV MONGODB_CLUSTER_ADDRESS  cluster0.krj9lox.mongodb.net
# ENV MONGO_USERNAME rohinigajakosh
# ENV MONGO_PASSWORD Rohini05

# WORKDIR /app

# COPY pakage*.json .

# RUN npm install

# copy . .

# CMD ["npm", "start"]


# Use a small, modern Node image
FROM node:20-alpine

# Always set a working dir
WORKDIR /app

# Copy only package manifests first (enables better layer caching)
COPY package*.json ./

# Install deps; prefer npm ci for reproducible builds
# If you need dev deps for a build step, omit --omit=dev
RUN npm ci --omit=dev

# Now copy the rest of the app
COPY . .

# Good: modern ENV syntax and safe defaults
ENV NODE_ENV=production
# Avoid baking secrets into the image; pass them at runtime instead.

# Document the port your app listens on
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
