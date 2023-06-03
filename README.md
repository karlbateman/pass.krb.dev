# Pass

> Passwordless authentication demo using passage.id and NextJS.

## Introduction

This is an example project which is a NextJS application with [Passage] identity service integration. It demonstrates
how to implement fullstack passwordless authentication using WebAuthN where supported, with an email magic link
fallback.

[passage]: https://passage.id

## Prerequisites

This project requires [NodeJS] and [NPM] is installed and configured on your local machine. If you don't have these
installed, I'd recommend installing [NVM] which can be used to install and manage NodeJS versions.

[nodejs]: https://nodejs.org
[npm]: https://npmjs.org
[nvm]: https://github.com/nvm-sh/nvm

## Passage Setup

Head over to <https://passage.id> and create an account. Then from the "My Apps" page, select "+ Create New App" and
select "Go fully passwordless", before clicking "Continue". Enter the following values when prompted:

```text
Name your application: pass.krb.dev
Enter the domain for your app: http://localhost:3000
Enter the redirect url: http://localhost:3000/
```

> You do not need to select a tech stack.

Click "Create new app" at the bottom of the page.

Next, go to the "Settings -> API Keys" page and create a new API key. Take note of your `APP ID` and `API KEY` which
will be required next when you setup this project and run it locally.

## Getting Started

Clone this project onto your system and follow the steps below to get things running.

Run the following command to create an `.env` file.

```text
cp .env.example .env
```

Open the `.env` file and add your APP ID and API KEY which you setup in the previous section. Once these values have
been added you can run the following command to launch the project.

```text
npm run dev
```

When the project is running, you can visit <http://localhost:3000> and go through the registration and authentication
experiences without requiring a password.

## Copyright

Copyright © 2023 Karl Bateman. All Rights Reserved.
