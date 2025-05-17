# Web application for remote banking

This course project is dedicated to creating a software application to optimize the activities of a banking enterprise.
The main task is to develop a web application with a graphical interface that interacts with a database to store, update, and process the 
necessary information, as well as execute various queries.

docker-compose down -v
## Quickstart: Initialize Database with Docker

1. Clone this repository:
   git clone https://github.com/VladBlnO0/WEBank
   cd WEBank

2. Run Docker Compose:
   docker-compose up --build

3. (Optional) If you need to re-initialize the DB (reset everything), stop the containers, remove the MySQL data volume, and start again:
   docker-compose down -v
   docker-compose up --build

4. Start DB manual
   docker exec -i mysql_db mysql -u root -p'rootpassword' < db-dumps/init.sql