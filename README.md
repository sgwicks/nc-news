# Northcoders News Now API

This project is a sample of everything I learned about making a database during the Northcoders bootcamp course, representing an API to access news articles, interact with comments, an upvoting/downvoting system and users who can author articles, comments or both.

# Take a look

Feel free to clone the repo down and take a look at what's going on behind the scenes. I also have it hosted over at https://nc-news-now.herokuapp.com/api so you can see how it functions live.

## Prerequisites

The database for this project was built with postgres, and uses it to test. If you don't already have it, install postgres: http://postgresguide.com/setup/install.html and set up a new user: http://postgresguide.com/setup/users.html

## Dependencies

If you're going to test it out yourself, here's a list of dependencies you're going to need:

**Dependencies**

* Express - runs the server
* pg - handles the database setup and required for knex
* knex - handles the SQL queries, seeding and migration

Once you've cloned down the repo, you should be able to just run 
```bash
npm install
```
to get these.

**A note for Linux users:** you'll need to set up a `user.js` file with your postgres username and password:

```js
{ user: 'username', password: 'password' }
```
 Leave it in the main nc-news directory.
 
 If you want to run the test suite, you'll also need:

**Dev Dependencies**

* mocha - the main testing suite
* chai - in tandem with chai
* supertest - handles the async testing of server requests

```bash
npm install -D mocha chai supertest
```
## Scripts

### Setting up the databases

```bash
npm run setup-dbs
```
This command will setup the development and test databases, ready to be seeded. If anything ever goes horribly wrong, like an untimely migration lock, this command will also drop the databases and re-up them. This is your start button and your reset button.

