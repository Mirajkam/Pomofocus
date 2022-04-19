# ---------- Base ----------
FROM node:17.8 as build-stage
RUN npm install -g http-server
WORKDIR /app
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install 
COPY . .
# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]

