1. Install MariaDB (for me, it was something like `sudo apt install mariadb-server`)
3. Login with `sudo mariadb` and create a user like this:
`create user admin identified by 'password'`
And then create a database like this:
`create table test`
And then grant permissions to the admin user like this:
`grant all privelages on *.* to 'admin'@localhost IDENTIFIED by 'password';`
And then flush privelages:
`flush privelages`
3. You should be able to run the example code now.
