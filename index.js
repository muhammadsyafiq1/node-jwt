import express  from "express"
import authRoute from "./routes/authRoutes.js"
import db from "./config/Database.js"
// import User from "./models/UserModel.js";
import dotenv from "dotenv"
dotenv.config()
const app = express();

// agar  bisa menerima data dalam bentuk JSON
app.use(express.json())

//middleware route
app.use(authRoute)

 try {
    await db.authenticate();
    console.log("Database Connected");
    // await User.sync()
 } catch (error) {
    console.error(error);
 }

 app.listen(5000, () => console.log('server running port 5000'));