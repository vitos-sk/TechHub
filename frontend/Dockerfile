# ---- Build Stage ----
  FROM node:20-alpine as build

  WORKDIR /app
  
  # Пробрасываем аргумент сборки
  ARG VITE_API_URL
  # Делаем ENV, чтобы Vite видел его на этапе сборки
  ENV VITE_API_URL=$VITE_API_URL
  
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build
  
  # ---- Production Stage ----
  FROM nginx:alpine
  
  COPY --from=build /app/dist /usr/share/nginx/html
  COPY nginx.conf /etc/nginx/conf.d/default.conf
  
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]