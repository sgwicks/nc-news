# Northcoders News Now API

This project is a sample of everything I learned about making a database during the Northcoders bootcamp course, representing an API to access news articles, interact with comments, an upvoting/downvoting system and users who can author articles, comments or both.

# Take a look

Feel free to clone the repo down and take a look at what's going on behind the scenes. I also have it hosted over at https://nc-news-now.herokuapp.com/api so you can see how it functions live.

## Setting Up

### Postgres

The database for this project was built with postgres, and uses it to test. If you don't already have it, install postgres: http://postgresguide.com/setup/install.html and set up a new user: http://postgresguide.com/setup/users.html

### Node.js & Node Package Manager

This project was built using node.js v13.11.0 and npm v6.13.7. If you don't already have them, you can find instructions to install them both here: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm 

### Git CLI

To clone the repo down onto your computer, you're also going to need a local version of git. Again, I'll let the git documentation speak for itself: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git 

### Clone the repo

Once you've got the pre-setup set up, it's time to clone the repo. In the command line, navigate to the folder you want to work from, and then run the following line:

```bash
git clone https://github.com/sgwicks/nc-news

cd nc-news
```

Now you can open the folder in a code editor; I built and ran this in VSCode (https://code.visualstudio.com/download) but I won't dictate how you should run it.

### Dependencies

The main dependencies you're going to need are:

* Express - runs the server
* pg - handles the database setup and required for knex
* knex - handles the SQL queries, seeding and migration

Once you've cloned down the repo, you should be able to just run 
```bash
npm install
```
and these will be installed for you.

**A note for Linux users:** you'll need to set up a `user.js` file with your postgres username and password:

```js
{ user: 'username', password: 'password' }
```
 Leave it in the main nc-news directory.
 
 If you want to run the test suite, you'll also need:

* mocha - the main testing suite
* chai - in tandem with chai
* supertest - handles the async testing of server requests

```bash
npm install -D mocha chai supertest
```
## Scripts

Now that everything is installed, you're almost ready to start playing around. First, though, you'll want to know a few basic scripts, and most importantly, don't forget to set up and seed the database before you do anything else, or it won't work.

### Setting up the databases

**\*\*\*DON'T SKIP THIS STEP\*\*\***

```bash
npm run setup-dbs
```
This command will set up both the development and test databases, ready to be seeded.

If anything ever goes horribly wrong, like an untimely migration lock, this command will also drop the databases and re-up them. This is your start button and your reset button.

### Seeding the databases

```bash
# to seed the development database

npm run seed-dev

# to seed the test database

npm run seed-test 
```
You have two sets of data - the larger, development data set and the smaller, test set. Feel free to play with either, but remember to be consistent. If you seed the test database, you won't be able to test the development database, and vice-versa. There's nothing stopping you from seeding both, of course.

These commands automatically run migration: they rollback to empty databases, and re-migrate the schema before seeding, so this is also soft reset. If that doesn't fix things, run the `setup-dbs` command first and everything should be well.

### Migration

```bash
# rollback to empty databases

npm run migrate-rollback
npm run migrate-rollback-test

# update to latest migration

npm run migrate-latest
npm run-migrate-latest-test

# rollback and update at the same time

npm run migrate-reset
npm run migrate-reset-test
```

If you want to run migration without seeding, these are your scripts. Without `-test` these scripts automatically assume development databases.

Like seeding, you can use these migrations as a soft-reset should something go wrong with your database, or if you want to play with an empty database with full table schemas set up.

