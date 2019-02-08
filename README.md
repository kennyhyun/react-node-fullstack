# react-node-fullstack

A simple fullstack project with a sample product seed data.

## Runnging development env

```
$ yarn
$ yarn start
```

Mongodb is required at localhost:27017 by default.

Use `./local-mongodb` if you need one. `./local-mongodb stop` will stop the db.

## Deployment

A docker file is ready with a local mongo db.
Try with 

```
$ docker-compose build
$ docker-compose up
```

Access `http://app.docker.me` with setting `/etc/hosts` file as ...

```
127.0.0.1 app.docker.me
127.0.0.1 api.docker.me
```

** Stop `local-mongodb` before running the deployment env

A [Traefik](https://traefik.io/) dashboard is on http://127.0.0.1:8080

You can also use external DB by...

```
$ MONGODB=mongodb://localhost:27017/dbname docker-compose up
```
