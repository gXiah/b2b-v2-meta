FROM node:lts-alpine

# HTTP server
RUN npm install -g http-server

## Working directory
WORKDIR /dist

# Preparing up the workdir
COPY package*.json ./
RUN npm install
COPY dist/* .

# Launching the server
EXPOSE 8080
CMD ["http-server", "."]