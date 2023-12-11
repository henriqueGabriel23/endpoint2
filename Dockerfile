# Escolha a imagem base do Node.js versão 16 Alpine
FROM node:16-alpine

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o arquivo package.json e package-lock.json (se disponível)
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie os arquivos do seu projeto para o diretório de trabalho
COPY . .

# Exponha a porta que sua aplicação usará
EXPOSE 3002

# Comando para iniciar sua aplicação
CMD ["node", "dist/src/main.js"]