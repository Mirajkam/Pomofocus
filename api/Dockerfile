FROM node:17.8

WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm ci
COPY . .
RUN npm run build

CMD ["node", "./dist/index.js"]