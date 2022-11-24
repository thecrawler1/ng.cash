FROM node:19.1.0-alpine
WORKDIR /app-backend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]
EXPOSE 3001
