var sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");
async function startup() {
  db = await sqlite.open({
    filename: 'database.db',
    driver: sqlite3.Database
  });
}

startup();

// Return all of the users
async function findOne(username, password) {
  const result = db.get("SELECT * FROM Users WHERE username=" + `'${username}'` + " AND password=" + `'${password}'`);
  return result;
}

async function findUser(username) {
  const result = db.get("SELECT * FROM Users WHERE username=" + `'${username}'`);
  return result;
}

async function findAll() {
  const result = db.all(`SELECT * FROM Users`);
  return result;
}

// Create a new user given a username, password
async function createUser(username, password) {
  const result = await db.run("INSERT INTO Users VALUES (?,?,?)",
    [username, password, 'member']);
  return result;
}

module.exports = {
  findAll, findOne, createUser, findUser
};
