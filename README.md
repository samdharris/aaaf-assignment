# TMS Media Management System

## About

This project was an assignment for the Application Architectures and Frameworks module at university where we were tasked to create a document management system based off a case study. The requirements for this project were to:

-   Handle the metadata that is used to describe each file.
-   Manage multiple versions for each file. As files are edited and used new versions will be
    created, for example images at different resolutions. Users must be able to track these
    versions and your tests should show how new ones are created.
-   Allow for the check-in and check-out of files by users so that different people are not editing
    the same file concurrently.
-   Be usable by project teams split across locations.
-   Project team members should be able to exchange messages
-   Manage user authentication and sessions. You do not need to have a registration form.

As well anything else that we could come up with.

The final requirements that were implemented in this project along with the above were:

-   Enable & Disable users so that they couldn't access the system
-   CRUD for teams
-   Add and remove users from teams
-   A Chat room for each team

## Architecture

This is a traditional client / server layout. The Client is a Vue.js application with the backend a RESTFul service running off Express.js.

## Technical

This is a full-stack MEVN app that runs on:

-   MongoDB
-   Express
-   Vue.js (inc Vuex, Vue Router & Vuetify)
-   Node.js
-   Socket.io

For Authentication, JWT tokens were used and for authorisation, a basic `isAdmin` flag was set against a user and that flag was checked on API requests as well as the route guards for Vue Routing.

## Setup and run.

To Setup and run this system, please refer to the README files in both folders.

## Known Issues

-   There is an issue where upon logging in, the chat fails to connect. This is due to how the token is currently being passed through to the socket.io endpoint. This can be resolved by refreshing the page **after logging in**.
