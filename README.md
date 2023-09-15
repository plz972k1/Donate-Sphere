<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Key Features

- **Campaign Creation:** Charities, non-profits, and individuals can create and manage fundraising campaigns, sharing their causes with a global audience.

- **User-Friendly Donations:** Donors can easily browse, search, and contribute to campaigns they're passionate about, making donations with confidence.

- **User Authentication:** Secure user accounts and authentication mechanisms ensure the safety of personal and financial information.

- **Donation History:** Donors can view their donation history, making it simple to track their charitable contributions.

- **Real-Time Notifications:** Donors receive notifications and updates on campaigns they've supported, fostering a sense of connection and transparency.

## Technologies Used

- **Backend:** Built on the NestJS framework, the backend leverages the power of Node.js, providing a robust and scalable server-side solution. MongoDB is used as the database to store campaign and user data.

- **Microservices:** The project employs a microservices architecture, allowing for the separation of concerns and scalability. Key microservices include campaigns, donations, user authentication, and notifications.

- **Containerization:** Docker and Docker Compose are used for containerization, ensuring consistent deployment across different environments.

- **Messaging:** RabbitMQ is used for message passing between microservices, enabling real-time updates and communication.

- **Authentication:** JWT (JSON Web Tokens) authentication is implemented to secure user endpoints and protect sensitive user data.
## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ docker-compose up --build
```

## API routes
Campaigns
- POST /campaigns: Create a new campaign
- GET /campaigns: Get a list of all campaigns
- GET /campaigns/:campaignId: Retrieve details for a specific campaign
- PATCH /campaigns/:campaignId: Update information for a specific campaign
- DELETE /campaigns/:campaignId: Delete a specific campaign
- GET /campaigns/search: Search for campaigns based on specific criteria

Donations
- GET /donations: Get a list of all donations
- POST /donations: Make a donation to a campaign
- GET /donations/user/:userId: Retrieve the donation history for a specific user
- GET /donations/campaign/:campaignId: Get a list of donations made to a specific campaign

Users
- POST /users: Create a new user account
- POST /users/login: Log in to an existing user account
- GET /users/:userId: Retrieve user details
- POST /users/logout: Log out of the user account
