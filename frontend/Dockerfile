# File: nextjs/Dockerfile
FROM node:22 AS base
WORKDIR /frontend
COPY ./package*.json ./
RUN npm install

# Development image
FROM base AS dev
ENV NODE_ENV=development
RUN npm install --only=development
COPY . .
CMD ["npm", "run", "dev"]

# Production image
FROM base AS prod
ENV NODE_ENV=production
COPY . .
RUN npm run build
CMD ["npm", "start"]
