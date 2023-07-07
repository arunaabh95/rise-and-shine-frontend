# Step 1: Build

FROM node:16.2 as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Deploy
FROM nginx:alpine
# copy the .conf template
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html 
