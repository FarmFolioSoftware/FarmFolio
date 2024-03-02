# Spring 2024 Software I FarmFolio Project

## Instructions for testing

- See [maria_dump.sql](\be\maria_dump.sql) and [DatabaseDiagram.jpeg](\DatabaseDiagram.jpeg) for the current schema of the **farmfolio** database. These will be updated as best as possible. When referencing the DB, use the same naming convention as in the diagram.

### Backend

- The backend is hosted in AWS. The frontend is configured to connect to the backend.

### Frontend
- From fe, run the following command:
    - `npm install`

- Run `npm start` to open the login page
- Enter a username/password that is/is not in the database and make sure it authenticates or not appropriately.

### Setting up the Frontend to be hosted on Amazon Linux EC2
- Run `sudo yum install httpd` to install the apache http server
- Run `sudo systemctl status httpd` to test the status. It should be inactive
- Run `sudo systemctl enable httpd` to enable the service
- Start it with `sudo systemctl start httpd`. It should be listening on port 80
- Run `sudo systemctl status httpd` again to make sure it is now active.
- `cd /var/www/html` and create an index.html to test
- The configuration file for apache is at `/etc/httpd/conf/httpd.conf`