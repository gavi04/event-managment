const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./backend/models/userModel");

dotenv.config({ path: "backend/config/config.env" });

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

const makeAdmin = async (email) => {
  await connectDatabase();
  // Wait a bit for connection
  setTimeout(async () => {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        console.log(`User with email '${email}' not found.`);
        process.exit(1);
      }
      user.role = "admin";
      await user.save();
      console.log(`Success! User '${user.name}' (${user.email}) is now an Admin.`);
      process.exit();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }, 1000);
};

const email = process.argv[2];
if (!email) {
  console.log("Please provide an email address as an argument.");
  console.log("Usage: node make_admin.js <email>");
  process.exit(1);
}

makeAdmin(email);
