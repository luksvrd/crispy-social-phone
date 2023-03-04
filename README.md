# Social Media API

![MongoDB](https://github.com/luksvrd/crispy-social-phone/blob/main/img/MongoDB.jpg)
![Routes](https://github.com/luksvrd/crispy-social-phone/blob/main/img/Routes.jpg)
![dep-graph](https://github.com/luksvrd/crispy-social-phone/blob/main/img/dep-graph.jpg)

## Built Using

JavaScript, Node.js, Express.js, MongoDB, Mongoose, dayjs, and Insomnia

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Questions](#questions)
- [Contributing](#contributing)
- [License](#license)

### \* [Description](#description)

An API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. Used Express.js for routing, a MongoDB database, and the Mongoose ODM. In addition to using the Express.js and Mongoose packages, I chose to use the JavaScript date library `dayjs` to parse, validate, manipulate, and display dates and times in JavaScript.
To see the routes in action, here is a [walkthrough video](https://www.loom.com/share/040a364726fd4dd3a974f62a4226d464)

```
User Story:
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data

Acceptance Criteria:
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

```

### \* [Installation](#installation)

This application assumes you have a 'complete dev environment' setup - a terminal, Node, & VS Code. To get started, Fork the repository and inside your terminal, `git clone` the new repo, `cd` into it and execute `npm i`.

The following commands must be executed to run the application properly:

- `npm i` to install all dependencies
- `npm start` will start the server and watch the `app` directory for any changes using `nodemon`

### \* [Usage](#usage)

Once you have started the server, you can begin to try out the various routes to run CRUD opperations on the database. I used Insomnia to test the routes, but you can use any API client you prefer. The following routes are available using http://localhost:3000/ as the base URL:

#### User Routes

- `GET /users` to get all users
- `GET /users/username` to get a single user by their username and populated thought, reaciton and friend data
- `POST /users` to create a new user
- `PUT /users/username` to update a user by their username
- `DELETE /users/username` to delete a user by their username
- `POST /users/username/friends/friendId` to add a new friend to a user's friend list
- `DELETE /users/username/friends/friendId` to remove a friend from a user's friend list

#### Thought Routes

- `GET /thoughts` to get all thoughts
- `GET /thoughts/thoughtId` to get a single thought by its `_id` and populated user and reaction data
- `POST /thoughts` to create a new thought (don't forget to include a `username` property with the username of the user who created the thought)
- `PUT /thoughts/thoughtId` to update a thought by its `_id`
- `DELETE /thoughts/thoughtId` to delete a thought by its `_id`

#### Reaction Routes

- `POST /thoughts/thoughtId/reactions` to create a reaction stored in a single thought's `reactions` array field
- `DELETE /thoughts/thoughtId/reactions/reactionId` to pull and remove a reaction by the reaction's `reactionId` value

### \* [Questions](#questions)

If you have any questions about the repo, open an issue at https://github.com/luksvrd/crispy-social-phone. You can also find more of my work on [Github](https://github.com/luksvrd)

### \* [Contributing](#contributing)

Contributors: Lukas Virden

- Thanks to [Manav Misra](https://github.com/manavm1990/html-css-practice) for the Starter Templates & all his teachings throughout the WUSTL Coding Bootcamp.

### \* [License](#license)

- [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
- ![NPM](https://img.shields.io/npm/l/inquirer?style=plastic)
- ![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)
- [![npm collaborators](https://img.shields.io/npm/collaborators/inquirer)](https://www.npmjs.com/package/inquirer)
- [![Dependents (via libraries.io)](https://img.shields.io/librariesio/dependents/npm/inquirer)](https://www.npmjs.com/package/inquirer)
- [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

- [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Copyright (c) 2022 Lukas Virden, All rights reserved.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
