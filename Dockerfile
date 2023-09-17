FROM oven/bun
LABEL authors="Emmey Leo"
LABEL maintainer="github.com/Mistyttm"

ENV BUN_ENV=production
ENV RAPIDAPI_HOST=streaming-availability.p.rapidapi.com

WORKDIR /project

COPY package.json package.json
COPY src/server src/server
COPY src/app/dist src/app/dist

RUN bun install

EXPOSE 5001

CMD bun run prod
