# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM tiangolo/node-frontend:10 as build-stage

RUN mkdir -p /app/frontend
RUN mkdir -p /app/react-components

WORKDIR /app/react-components
COPY react-components/package*.json ./
RUN npm install
COPY react-components/.babelrc ./
COPY react-components/components ./components/
RUN npm run build
RUN npm link

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
RUN npm link react-components
COPY frontend/.env.production ./
COPY frontend/src ./src/
COPY frontend/public ./public/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.14.2 as production

COPY --from=build-stage /app/frontend/build /usr/share/nginx/html
COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf

