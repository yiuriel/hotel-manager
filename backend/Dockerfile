# File: nestjs/Dockerfile
FROM node:20 AS base
WORKDIR /backend
COPY ./package*.json ./
RUN npm install

# Development image
FROM base AS dev
ENV NODE_ENV=development
RUN npm install --only=development
COPY . .
CMD ["npm", "run", "start:dev"]

# Production image
FROM base AS prod
ENV NODE_ENV=production
COPY . .
RUN npm run build
CMD ["node", "dist/main"]
