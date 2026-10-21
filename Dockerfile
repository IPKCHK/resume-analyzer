# Change this:
# FROM node:22-alpine

# To this:
FROM node:22-slim

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY backend ./backend
EXPOSE 3000
CMD ["node", "backend/server.js"]