const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');


dotenv.config({ path: './config.env' });

//CONNECT TO DATABASE 
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB);
        console.log("DB Connection successfully");
    }
    catch(error){
        console.error("Error connecting to database:", error);
    }
}

connectDB();




//START SERVER
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
