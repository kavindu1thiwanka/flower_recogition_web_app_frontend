# Stage 1: Build the Angular app
FROM node:16.13.0 as build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build -- --output-path=./dist/out --configuration production

# Stage 2: Serve the Angular app with NGINX
FROM nginx:alpine

COPY --from=build /app/dist/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
