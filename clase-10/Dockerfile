# Usa una imagen base de Node.js
FROM node:alpine

RUN apk add --no-cache python3 make g++ py3-setuptools

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que la aplicación va a correr
EXPOSE 9001

# Comando para iniciar la aplicación
CMD ["node", "index.js"]
