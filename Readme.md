This architecture design was developed to build a backend ecosystem for management of leaderboard for a game. Primary goal is to build a robust ecosystem which is reliable and is CI/CD enabled. The document provides all the considerations taken to build this ecosystem.

### Requirements
- NodeJS - 16+
- git

### Installation
```bash
git clone git@github.com:SammithSB/leaderboard-mutantx.git
npm -i
# setup .env file with the following line as data
# MONGO_CONNECTION_URL="your_mongo_uri"
node app.js
```

### Usage
For local usage, running the above command will start the server at [http://localhost:5000](http://localhost:5000)

Otherwise the deployed API can be accessed at [https://leaderboard-mutantx.herokuapp.com/](https://leaderboard-mutantx.herokuapp.com/)

Accessing the root link should return "Hi, It works!".

#### Available endpoints

###### Scores
- `/submit-score-20/:email` - POST Method, to be used for increasing the score of the particular user by 20

- `/submit-score-60/:email` - POST Method, to be used for increasing the score of the particular user by 60

- `/submit-score-100/:email` - POST Method, to be used for increasing the score of the particular user by 100

- `/rankings` - GET Method, used for getting rankings of users in the database

- `/scores/:email` - GET Method, used for getting score of that particular user

###### Users
- `/users` - GET Method, to get the list of all users in the database

- `/users/:email` - GET Method, to get the information of that particular user

- `/users` - POST Method, to upload the new user data of the form
```json
{
    "email":"",
    "password":"",
    "name":""
}
```


- `/users/:email` - POST Method, to update the users data, set user as Admin etc

- `/users/:email` - DELETE Method, to delete the data of a particular user

- `/users/login` - Login to the app, using credentials already existing in the Database
