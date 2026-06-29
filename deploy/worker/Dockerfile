FROM node:20-alpine
WORKDIR /app
COPY app/ .
RUN apk upgrade --no-cache && adduser -D app-user
USER app-user
CMD ["node", "server.js"]
