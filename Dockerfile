FROM node:18-alpine
LABEL authors="Emmey Leo"
LABEL maintainer="github.com/Mistyttm"

ENV NODE_ENV=development

# Working directory of the server
WORKDIR /src

COPY package*.json ./

# Install node modules
RUN npm ci

# Copy source code
COPY ./src ./src

EXPOSE 5000
CMD ["npm", "run", "dev"]

