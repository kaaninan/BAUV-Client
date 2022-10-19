# BAUV Client

This is the client for the BAUV project. It is a web application that allows users to view and interact with the data collected by the BAUV-Server.

## Pre-requisites

- BAUV-Maps (Docker Image)
- Node.js 16 or Docker

## 1. BAUV-Maps Installation

Go to the [BAUV-Maps Releases](https://github.com/kaaninan/BAUV-Maps/releases) repository and download the latest release (.tar.gz file).

Run following command to load the image:

```bash
docker load < mapserver.tar.gz
```

Run following command to start the container:

```bash
docker run -d -p 8000:8000 -p 8001:8001 --restart always mapserver
```

All running containers can be seen with following command:

```bash
docker ps -a
```

To see the logs of the container, run following command:

```bash
docker logs -f CONTAINER_ID
```

Kill the container with following command:

```bash
docker rm -f CONTAINER_ID
```

## 2. BAUV-Client Installation

### Option 1: Standalone (without Docker)

#### Installation

To install the dependencies, run:

```bash
npm install
```

#### Running

To run the application, run:

```bash
npm run serve
```

#### Building

To build the application, run:

```bash
npm run build
```

### Option 2: Run with Docker

#### Building

To build the docker image, run:

```bash
docker build -t bauv-client .
```

#### Running

To run the docker image, run:

```bash
docker run -d -p 8080:8080 bauv-client
```
