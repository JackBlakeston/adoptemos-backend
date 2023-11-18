# adoptemos-backend
This is the backend repository for the Adoptemos project, a platform dedicated to helping people adopt dogs.
For now, it only works in Malaga, Spain. Scaling is difficult since we have to scrape websites.
The backend is built using Node.js and MongoDB, and it's hosted on Heroku.

## Table of Contents

- [Project Overview](#project-overview)
- [Local Development](#local-development)
- [Continuous Integration and Deployment](#continuous-integration-and-deployment)
- [Contribution](#contribution)
- [License](#license)

## Project Overview

The Adoptemos Backend is responsible for handling dog adoption-related data and operations.
It scrapes dog shelter websites and aggregates all the dogs for adoption in the area.
It provides RESTful API endpoints for retrieving and managing dog adoption information.

## Local Development

To set up the project for local development, follow these steps:

1. **Install Dependencies:**

```bash
npm install
```

3. **Environment Variables:**

Create a `.env` file in the root directory. You can follow the .env.sample file.

4. **Start the server on docker:**

```bash
npm run docker-start-quiet
```
or
```bash
npm run docker-start
```

Or if you want to use watch mode for development:
```bash
npm run watch
```


The backend server should now be running locally. You can access it at `http://localhost:<PORT>`.

## Continuous Integration and Deployment

This project uses GitHub Actions for Continuous Integration and Deployment (CI/CD). The CI/CD pipeline is set up to automatically run tests and deploy to Heroku when a pull request is merged to the `main` branch.
The `main` branch is protected so you can't push directly to it. You should always use feature branches for development.

### Workflow Overview

The CI/CD pipeline consists of the following jobs:

- **Install:** Installs project dependencies and caches them for subsequent jobs.
- **Build:** Runs TypeScript compilation, and builds the project.
- **Test:** Runs tests.

Merging a pull request to master additionally runs this job:
- **Deploy:** Deploys the application to Heroku.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.