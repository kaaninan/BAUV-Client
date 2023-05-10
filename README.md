# BAUV Client

![build](https://github.com/kaaninan/bauv-client/actions/workflows/build.yml/badge.svg)
![docker](https://github.com/kaaninan/bauv-client/actions/workflows/docker.yml/badge.svg)
![Docker Image Version (latest by date)](https://img.shields.io/docker/v/kaaninan/bauv-client?label=docker&sort=date)

This is the client for the BAUV project. It is a web application that allows users to view and interact with the data collected by the BAUV-Server.

## Pre-requisites

-   [BAUV-Maps](https://github.com/kaaninan/BAUV-Maps/blob/master/USAGE.md)
-   Node.js 16
-   Docker (Optional)

## BAUV-Client Installation

### Option 1: Standalone

#### Installation

Clone the repository:

```bash
git clone git@github.com:kaaninan/BAUV-Client.git
```

To install the dependencies, run:

```bash
npm install
```

#### Debugging

To run the application in debug mode, run:

```bash
npm run serve
```

#### Production

To run the application in production mode, run:

```bash
npm run build # Builds the production files
npm run production # Starts the production server
```

Open the application on `http://localhost:5050`

#### Lint

To run the linter, run:

```bash
npm run lint
```

### Option 2: Run with Docker

```bash
docker pull kaaninan/bauv-client:latest
```

#### Running

To run the docker image, run:

```bash
docker run -d -p 5050:5050 bauv-client
```

Open the application on `http://localhost:5050`

## BAUV-Client Development

### Create new version

To create a new version change the version in `package.json` and run:

```bash
git tag -a v1.0.0 -m "Version 1.0.0"
git push origin v1.0.0
```

This triggers the build and publish workflow.

### Build Docker Image

To build the docker image, run:

```bash
docker build -t bauv-client .
```

# Notes

-   ROS Camera Stream: https://www.theconstructsim.com/developing-web-interfaces-for-ros-robots-4-streaming-robots-camera-on-the-web-page/
