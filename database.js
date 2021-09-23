const { Pool } = require('pg');

const connection = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://bvxlnrtxtgexgz:650560b6331496045e9ff5684ae980aada777fe1dc39c689728d6108de5feb6a@ec2-54-195-246-55.eu-west-1.compute.amazonaws.com:5432/d1ib8ub96ri36v",
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = connection;