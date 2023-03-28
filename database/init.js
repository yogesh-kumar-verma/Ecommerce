const mongoose = require("mongoose");
const sql = require("mssql");
let { user, password, port, server, database } = process.env;
// main().catch((err) => console.log(err));
const config = {
  user: "sa",
  password: "<password>@",
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

// module.exports = async function main() {
//   let pool = await sql.connect(config);
//   console.log("database connected");
//   return pool;
// };

module.exports = async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/EcommerceWithSeller");
  // await mongoose.connect(
  //   "mongodb+srv://yogesh:<pass>cluster0.zjs4vuh.mongodb.net/ecommerce?retryWrites=true&w=majority"
  // );

  console.log("database connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};
