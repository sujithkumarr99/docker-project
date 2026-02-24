FROM node:18

WORKDIR /app
COPY . .
RUN npm init -y
RUN npm install express

EXPOSE 6000
CMD ["node", "server.js"]
