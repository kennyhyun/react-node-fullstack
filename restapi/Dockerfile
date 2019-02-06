FROM node:10.15.1-alpine as base
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
EXPOSE 8000

FROM base as development
ENV NODE_ENV development
COPY package.json package-lock.json ./
RUN npm i
COPY webpack.config.js jest.config.js .babelrc ./
COPY src ./src/
CMD ["npm", "run", "start"]

FROM development as build
ENV NODE_ENV=production
RUN npm run build

FROM base as production
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm i
COPY --from=build /usr/src/app/dist ./dist
CMD ["npm", "start"]

