const sql = require("mssql");
let { user, password, port, server, database } = process.env;
// main().catch((err) => console.log(err));
const config = {
  user: "sa",
  password: "Vyogesh07032002@",
  server: "localhost",
  database: "practice",
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedconnection: true,
    enableArithabort: true,
  },
  port: 1433,
};
const sqlc = sql.connect(config);
module.exports = { sqlc };
