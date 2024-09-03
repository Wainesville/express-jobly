"use strict";
/** Database setup for jobly. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let db;

const databaseUri = getDatabaseUri();
if (!databaseUri) {
  throw new Error("Database URI is not defined. Please check your environment configuration.");
}

if (process.env.NODE_ENV === "production") {
  db = new Client({
    connectionString: databaseUri,
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  });
} else {
  db = new Client({
    connectionString: databaseUri,
  });
}

db.connect((err) => {
  if (err) {
    console.error('connection error', err.stack);
  } else {
    console.log('connected to the database');
  }
});

module.exports = db;
