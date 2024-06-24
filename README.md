
# Answers Ai - Q&A Service

This backend service provides precise ai generated answers to your questions.

Tech Used - Typescript, Nodejs/Expressjs, JsonWebTokens, Docker, Drizzle ORM, PostGreSQL, Google Cloud Platform (Cloud Run and Cloud SQL(Postgres)) 


## Deployed Service

Deployed Service Base Url - https://ansai-ou2mefcgzq-el.a.run.app

This service uses Google Cloud Run for deployment and it's serverless architecture to scale it to hundreds of thousand users and Google Cloud SQL Postgres instance as it's managed database for scalability.

**API SPEC**

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/17333320-2b3f02f3-3c47-4df8-a031-a445c8995690?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D17333320-2b3f02f3-3c47-4df8-a031-a445c8995690%26entityType%3Dcollection%26workspaceId%3D3e905701-4ca8-48f5-b214-75f51d968f3a)

AUTH URLs
```bash
/api/auth/login - for logging in.
/api/auth/login - to logout and clear cookies/tokens.
/api/auth/refresh - to verify tokens and regenerate them.
```
USER URLs
```
/api/users - to register a new user
/api/users/:userId - to get the user profile details with the given userId.
/api/users/:userId/questions - To retrieve all the questions asked by a user with the given userId
```
QUESTION URLs
```
/api/questions - ask a question as a logged in user and get an ai generated answer.
/api/questions/:questionId - Retrieve specific question and answer by question ID.
```




## Installation to run locally

Make sure you have Nodejs, Git and Docker installed for your respective operating system to directly run this in a container locally.

- Clone the repository
- Change .env.sample to .env.production
- Add your own client ssh certificates if using google cloud SQL and make sure to whitelist your ip address to accept requests in the network settings in google cloud SQL.
- Add relevant environment variables as mentioned
- Run Docker
- Build the docker image using the provided Dockerfile
- Run the Docker Image in a container

**Step by Step**

```bash
- git clone https://github.com/amanx123/answersai.git
- Rename .env.sample to .env.production
- Add properly the required environment variables into the .env file and relevant certificates.
- docker build -t answersai . 
- docker run -it -p 3000:3000 answersai

```
The container should be ready to accept requests over http://localhost:3000.
## Suggested Design Architecture

This design brings more **robustness, reliability and scalability** for this backend service.

**[Lucid Design Chart Link](https://lucid.app/lucidchart/540a9b23-2b88-4eb0-95af-ed3b3fefa952/edit?viewport_loc=-81%2C-168%2C1755%2C998%2C0_0&invitationId=inv_15c9209b-38ac-48ea-baf9-a8a3e6269f23)**
