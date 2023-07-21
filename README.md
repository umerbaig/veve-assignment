
# Veve Backend Assignment

## Installation

```
COPY .env.example to .env
```

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Running the app via Docker compose 

```bash
docker-compose up
```
## Authentication/Authorization

* For authenticated routes need to provide a valid JWT token in request header i.e `Authorization: Bearer{youraccesstoken}`
* For role based protected routes need to send role in header i.e `x-role: CUSTOMER`
* Currently there is only one role this app supports which is `CUSTOMER`
* Make sure you signed JWT token with the payload which must include `user_id: number`, `roles: string[]`
* Signed JWT token with a private secret key and provide that secret key in env variable `JWT_SECRET=` along with expiration in hours `JWT_EXPIRATION=`

## Assumptions

* We are assuming that JWT token will be provided by the client while making a graphql request which should be signed by the respective JWT secret key which we also need to give it in the env variable `JWT_SECRET=` along with jwt expiration in hours `JWT_EXPIRATION=`
* We are assuming that a customer can tranfer his NFT to another customer.
* For simplicity there is only role supported for now which is `CUSTOMER`
* Customer can transfers NFT's they own and can query only their NFT's.
* We are not covering the change of ownership of NFT log. Assumping that it's not part of the assignment.
* To make things simple, we are not creating users modules. 

### What would you do differently if you were allocated more time?

* I could add users, auth modules where we can fetch access token by login user.
* Besides unit tests, I would add integration tests to validate the interaction between different components and ensure that the entire application functions correctly.
* Extend the user authentication process to include user registration and password hashing for secure storage.
* Integrate proper error logging mechanisms to capture and record errors for monitoring and debugging purposes
* Overall, the additional time would be used to further enhance the application's functionality, performance, security, and user experience while adhering to best practices and industry standards.

### Are there any improvements you could make to your submission?

* I could add integration tests to validate the interaction between different components and ensure that the entire application functions correctly.
* I could add how database migrations are managed using TypeORM to handle schema changes and updates.
* I could add more robust logging in the entire app. 

### How did you decide on the technical and architectural choices used as part of your solution?

* **GraphQL Server with NestJS:** NestJS is a popular and powerful framework for building scalable and maintainable Node.js applications. It provides excellent support for building GraphQL servers, and its modular architecture, dependency injection, and strong typing make it well-suited for implementing complex features.

* **MySQL with TypeORM:** MySQL is a widely used relational database, and TypeORM is an Object-Relational Mapping (ORM) library for TypeScript. TypeORM simplifies database interactions and allows developers to work with database entities as regular TypeScript classes. MySQL and TypeORM were chosen because they are commonly used in web development and can handle relational data efficiently.

* **Separation of Concerns with Modules:** The solution follows the principle of separation of concerns by organizing the code into separate modules. Each module focuses on specific functionalities, such as NFT-related operations and user authentication. This modular approach enhances code organization, maintainability, and readability.

* **GraphQL for NFTs:** GraphQL is used for NFT-related operations because of its flexible and efficient data fetching capabilities. It allows clients to request only the required data, reducing over-fetching and improving API performance.

* **JWT for Authentication:** JWT (JSON Web Tokens) is widely used for user authentication in modern web applications. It provides a stateless and secure way to handle user sessions. The decision to use JWT for authentication ensures a robust and scalable authentication mechanism.

* **Role-Based Access Control (RBAC):** The implementation of Role-Based Access Control (RBAC) with `CUSTOMER` role provides different levels of access to specific operations. This approach allows customers to have restricted access based on their roles.

* **Unit Testing:** The decision to write unit tests is based on the best practice of Test-Driven Development (TDD). Unit tests help ensure code quality, detect bugs early, and provide a safety net for refactoring and changes.

* **Health Check:** The decision to add a health check in the application is a best practice in modern web development. A health check endpoint allows monitoring systems and load balancers to check the status and health of the application.

* **Assumptions for Simplification:** Some assumptions were made in the initial solution to simplify the example while covering the core functionalities. These assumptions aimed to demonstrate the key concepts without overwhelming the code with unnecessary details.

