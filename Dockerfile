# Usar a imagem oficial do Node.js  
FROM node:18  

# Definir o diretório de trabalho  
WORKDIR /usr/src/app  

# Copiar o package.json e package-lock.json  
COPY package*.json ./  

# Instalar as dependências  
RUN npm install  

# Copiar o restante do código  
COPY . .  

# Compilar o TypeScript  
RUN npm run build  

# Expor a porta que a aplicação irá rodar  
EXPOSE 3000  

# Comando para iniciar a aplicação  
CMD ["node", "dist/index.js"]