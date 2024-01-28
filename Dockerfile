FROM node:21-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=prod

COPY . .

ENV PORT=3001

EXPOSE 3001

RUN npx prisma generate

CMD ["node", "index.js"]