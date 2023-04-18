# BAUV Client

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/kaaninan/bauv-client/docker-image.yml)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/kaaninan/bauv-client/test.yml)

![GitHub release (latest by date)](https://img.shields.io/github/v/release/kaaninan/bauv-client)

This is the client for the BAUV project. It is a web application that allows users to view and interact with the data collected by the BAUV-Server.

## Pre-requisites

-   [BAUV-Maps (Docker Image)](https://github.com/kaaninan/BAUV-Maps/blob/master/USAGE.md)
-   Node.js 16 or Docker

## BAUV-Client Installation

### Option 1: Standalone

#### Installation

To install the dependencies, run:

```bash
npm install
```

#### Debugging

To run the debug application, run:

```bash
npm run serve
```

#### Production

To run the production application, run:

```bash
npm run build
npm run prod
```

### Option 2: Run with Docker

#### Option 2.1: Build Docker Image

To build the docker image, run:

```bash
docker build -t bauv-client .
```

#### Option 2.2: Use Prebuilt Docker Image

See: [Releases](https://github.com/kaaninan/BAUV-Client/releases)

This release includes prebuild docker image. It could be used without building the docker image.

**Step 1:** Download the release and extract it.

**Step 2:** Import the docker image with the following command:

```bash
docker load < /path/to/exampleimage.tgz
```

#### Running

To run the docker image, run:

```bash
docker run -d -p 5050:5050 bauv-client
```

Open the application on `http://localhost:8080`

# Notes

-   ROS Camera Stream: https://www.theconstructsim.com/developing-web-interfaces-for-ros-robots-4-streaming-robots-camera-on-the-web-page/
