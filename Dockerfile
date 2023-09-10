FROM oven/bun
LABEL authors="Emmey Leo"
LABEL maintainer="github.com/Mistyttm"

ENV BUN_ENV=development

# Working directory of the server
WORKDIR /src

COPY package*.json ./

# Install node modules
RUN bun i

# Copy source code
COPY ./src ./src

EXPOSE 5000
CMD ["bun", "run", "dev"]

