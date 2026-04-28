const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = require("./app");
const { connectDB } = require("./src/config/db");

// Connect to the database
connectDB();

const port = Number(process.env.PORT || process.env.port || 3000);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});