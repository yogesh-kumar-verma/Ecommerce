const mongoose = require("mongoose");
const sql = require("mssql");
 
let { ISSQL, user, password, server, database, port, mongodconnect } =
  process.env;
// main().catch((err) => console.log(err));
const config = {
  user: user,
  password: password,
  server: server,
  database: database,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedconnection: true,
    enableArithabort: true,
  },
  port: 1433,
};
if (process.env.ISSQL) {
  module.exports = async function main() {
    let pool = await sql.connect(config);
    console.log(" sql database connected");
  };
} else {
  module.exports = async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/EcommerceWithSeller");
    // await mongoose.connect(
    //  mongodconnect
    // );

    console.log("database connected");
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  };
}
