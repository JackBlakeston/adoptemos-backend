# adoptemos-server
This is the backend repository for the Adoptemos project, a platform dedicated to helping people adopt dogs.
For now, it only works in Malaga, Spain. Scaling is difficult since we have to scrape websites.
The backend is built using Node.js and MongoDB, and it's hosted on Heroku.

## Table of Contents

- [Project Overview](#project-overview)
- [Environment setup](#environment-setup)
- [Docker](#docker)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
- [Openapi](#openapi)
- [Database migrations](#database-migrations)
- [License](#license)

## Project Overview

The Adoptemos Server is responsible for handling dog adoption-related data and operations.
It provides RESTful API endpoints for retrieving and managing dog adoption information.

## Environment setup

To set up the project for local development, follow these steps:

1. **Install Dependencies**

```bash
npm install
```

2. **Environment Variables**

Create a `.env` file in the root directory. You can follow the .env.sample file.

3. **Firebase Service Account Key**

Get a Service Account Key in json format from the firebase console settings of the project or from a repo maintainer. Store it in string form as the `FIREBASE_SERVICE_ACCOUNT_KEY` env variable. You can follow `.env.sample` file for reference.

4. **Set up husky precommit hook**

```bash
npx husky install
```

5. **Start the Docker container**

```bash
npm run docker-start
```

The backend server should now be running locally. You can access it at `http://localhost:<PORT>`.

## Docker

The project is set up to be run from Docker containers. There is a `Dockerfile` for each environment, but only one `docker-compose` that is shared between Dev and CI.

### Commands

- Build docker image: `npm run docker-build`
- Start docker containers: `npm run docker-up`
- Stop docker containers: `npm run docker-down`
- Build images and start containers: `npm run docker-start`

### Dev

For local development the server is run together with a mongoDb image. The server container is linked to the `src` folder and will run `npm run watch` upon starting, so any changes you make within src will be applied immediately. The server will also run any pending database migrations upon starting, so if you add a new migration you must restart the container.

### CICD

In all workflows, the first step is always to build a docker image and upload it as a github artifact. In subsequent jobs, when needed, the artifact is downloaded and the image is run in a container, and all the workflow actions are run within it.

To start the containers in a job, use the `run-containers` custom github action like this:

```yaml
- name: Set up docker containers
  uses: ./.github/actions/run-containers
  with:
    image-name: ${{ secrets.APP_NAME }}
```

This will download the image artifact and start the container.

### Prod

Render is configured to build the Prod `Dockerfile` and use it to Deploy the app. It also runs database migrations upon starting.

## Continuous Integration and Deployment

This project uses GitHub Actions for Continuous Integration and Deployment. The CICD pipeline is set up to automatically deploy to Render when a pull request is merged into the `main` branch.
The `main` branch is protected so you can't push directly to it.

### CICD workflow overview

Upon pushing to a feature branch, the following jobs will be executed:
- **Build:** Builds Docker image and uploads it as an artifact
- **Unit Tests:** Runs Unit Tests
- **Integration Tests:** Runs Integration Tests

Upon merging a pull request into `main`, the previous jobs will run along with:
- **Validate:** Lints and typechecks the codebase
- **Deploy:** Deploys the application to Render.

### Github Actions

Workflows are stored in the `.github/workflows` directory. Triggered workflows start with the prefix `on-`. These workflows consist of jobs that use the other reusable workflows. Reusable steps are stored in the `actions` folder.

## Openapi

Openapi docs are generated using [Swagger](https://swagger.io/) and served with [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express).

You can autogenerate swagger docs using the command
```
npm run auto-docs
```
The framework patterns must be followed for this to work.

## Database migrations
Database is migrated with [migrate-mongo](https://www.npmjs.com/package/migrate-mongo) library, but the config and migration files are in typescript and they are compiled before executing any migration commands.

- To create a new migration file: `npm run migration-create <migrationName>`
- To run all migrations: `npm run migration-up`
- To revert the last migration: `npm run migration-down`
- To get the status of migrations: `npm run migration-status`

Additionally, you can use `npm run migration <command>` to run any of the other migrate-mongo commands.

The Docker images for Dev and Prod environments will run pending migrations upon starting, so there is generally no need to run migrations manually unless you want to revert something.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
