# Project Title

Music playlist generator

---

## Description
A random music player generator. The API generates a random music player list depending upon the user logged in to the network. 

## Requirements

For development, you will only need Node.js (x14) and a node global package, Npm (x7), and Docker installed in your environement.


## Install

    $ git clone https://github.com/shashanksal/music-playlist-generator
    $ cd music-playlist-generator
    $ npm install

## Running docker

Run `docker-compose.yml` by using command `docker-compose up -d` from the root of the project.
The above Docker configuration will run the dynamodb local server for testing purposes. 

## Running database scripts

Once database container is up and running, run scripts to initialise the table and some random seed data

    $ node scripts/createTable.js
    $ node scripts/loadData.js

## Running the project

    $ npm start

## Simple build for production

    $ npm build

## Reflection

The API is non-functional at this stage.
The API is developed considering a serverless function model, example AWS Lambda or Azure functions, etc. Template file can be added as required.

Although some of non-functional components, etc linting can be performed. 