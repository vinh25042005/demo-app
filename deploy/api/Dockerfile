FROM node:20-alpine
WORKDIR /app
COPY app/ .
RUN apk upgrade --no-cache && adduser -D app-user
USER app-user
EXPOSE 3000
CMD ["node", "server.js"]
