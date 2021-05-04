FROM node:15-alpine as Node

ENV NODE_ENV=production

WORKDIR /home/node/app
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN chown -R node:node /home/node/app

USER node

RUN yarn --network-timeout 1000000 install

COPY --chown=node:node ./src ./src
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./types ./types
COPY --chown=node:node ./snowpack.config.js ./snowpack.config.js
COPY --chown=node:node ./svelte.config.js ./svelte.config.js
COPY --chown=node:node ./tailwind.config.js ./tailwind.config.js
COPY --chown=node:node ./postcss.config.js ./postcss.config.js
COPY --chown=node:node ./tsconfig.json ./tsconfig.json

RUN yarn build

FROM nginx:alpine

COPY --from=Node /home/node/app/build /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]