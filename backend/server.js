const app = require("./app");
const connectDb = require("./config/databaseConfig");
const dotenv = require("dotenv");
dotenv.config({ path: "backend/config/.env" });
connectDb();

app.listen(process.env.PORT, () => {
  console.log(`Server Started in port ${process.env.PORT} `);
});
