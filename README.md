# Spring 2024 Software I Produce Tracking Project

## Instructions for testing

### Setting up MariaDB Locally (this is only until we host the DB remotely)

#### For Windows

- Download MariaDB Community from this [link](https://mariadb.com/downloads/). Make sure to select the correct version (tested with 11.2.2-GA) and OS version
- Run the installer with mostly default settings
    - Make sure to modify the root password (used "root" as password to test)
    - Check mark Enable access from remote machines for 'root' user
    - Check mark Use UTF8 as default server's character set
    - If the port that MariaDB uses for its service (3306) is currently being used you may have to change it or kill what is using the port.
- Once the installer is finished you can go to Task Manager and in the Services tab see a **MariaDB** service currently running. You can right click on the service to Start/Stop it
- Add MariaDB to PATH to you can run mariadb commands. It should be in Program Files/MariaDB 11.2/bin
- Open a command prompt from anywhere and run `mariadb -u root -p -h localhost`. You should be prompted for password.
- Once connected, run `create database farmfolio;` to make a new blank database
- Run `exit` to leave the MariaDB connection
- Run `mariadb -u root -p -h localhost farmfolio < maria_dump.sql` from /be0.1 directory. This will fill the **farmfolio** database you just created with the schema saved in the **maria_dump.sql** file

#### For Linux

1. Install MariaDB (for me, it was something like `sudo apt install mariadb-server`)
3. Login with `sudo mariadb` and create a user like this:
`create user admin identified by 'password';`
And then create a database like this:
`create database farmfolio;`
And then grant permissions to the admin user like this:
`grant all privelages on *.* to 'admin'@localhost IDENTIFIED by 'password';`
And then flush privelages:
`flush privelages;`
3. Import the existing schema with this command:
`sudo mariadb -e "source maria_dump.sql" farmfolio`
4. You should be able to run the example code now.


### Backend

Install the following dependencies first:
- `npm install express` in be0.1
- `npm install cors` in be0.1
- `npm install mariadb` in be0.1

`node index.js` will host the backend

### Frontend
- Install the **Live Server** VS Code extension by **Ritwick Dey**
- Right click anywhere inside index.html and select "Open with Live Server"
- Enter a username/password that is/is not in the database and make sure it authenticates or not appropriately.
