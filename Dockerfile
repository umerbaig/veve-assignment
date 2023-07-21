# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=18.12.1

FROM node:${NODE_VERSION}-alpine

WORKDIR /

COPY ./ ./

RUN npm install
