FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8541

COPY package*.json ./
RUN npm ci --omit=dev

COPY server.js ./

EXPOSE 8541

CMD ["npm", "start"]
