const mongoose = require("mongoose");
console.log("Loaded environment variables:", process.env);
console.log("MongoDB URI:", process.env.MONGODB_URI);
const connectDatabase = () => {
   

    mongoose.connect(process.env.MONGODB_URI, {  useUnifiedTopology:true,
        useNewUrlParser: true,
        })
        
        .then(() => {
            console.log(`MongoDB connected successfully`);
        });
        //->unhandled promise rejection ne samhal liya
       // .catch((err) => {
       //     console.error("MongoDB connection error:", err);
       //     process.exit(1); // Exit the process if database connection fails
       // });
}

module.exports = connectDatabase;
