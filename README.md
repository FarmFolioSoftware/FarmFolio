# Spring 2024 Software I Produce Tracking Project

## Instructions for testing

- Send your public IP to the person hosting the database (Evan) so they can add you to the Security Group in AWS.
- Create a `.env` file in be0.1 and copy paste into in the contents of the .env file from Teams.
> Note: `.env` has been added to the .gitignore, but still take care to never commit this file to git as it contains secrets.
- See [maria_dump.sql](\be0.1\maria_dump.sql) and [DatabaseDiagram.jpeg](\DatabaseDiagram.jpeg) for the current schema of the **farmfolio** database. These will be updated as best as possible.

### Backend

- From be0.1, install the following dependencies:
    - `npm install express`
    - `npm install cors`
    - `npm install mariadb`
    - `npm install dotenv`

- Run `node index.js` to host the backend

### Frontend
- From fe0.1, install the following dependencies:
    - `npm install node `

- Run `npm start` to open the login page
- Enter a username/password that is/is not in the database and make sure it authenticates or not appropriately.
