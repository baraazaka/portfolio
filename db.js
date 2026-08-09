const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "portfolio_db",
    password: "barazaka0599",
    port: 5433,
});

module.exports = pool;