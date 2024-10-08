# Etapa 1: Construção da aplicação
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Substitua variáveis no código de ambiente, se necessário
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx
FROM nginx:stable-alpine

# Copia os arquivos de build da aplicação React
COPY --from=build /app/build /usr/share/nginx/html

# Copia a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
