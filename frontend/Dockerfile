FROM node:19.1.0-alpine
WORKDIR /app-frontend
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start:production"]
EXPOSE 3000
