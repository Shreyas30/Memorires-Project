import express from 'express';
// import bodyParser from 'body-parser'; //! Deprecated
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
const app = express();
import dotenv from "dotenv";

dotenv.config(); //* For Accessing Environmental Varibles

// app.use(bodyParser.json({limit:"30mb",extended:true})) //! Deprecated
app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

//? Routes Should be always below above 3 lines
//* Routes
app.use('/posts',postRoutes);
app.use('/user',userRoutes);

// Connecting to MongoDB Atlas
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => app.listen(PORT,() => console.log(`Server Running on port ${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set("useFindAndModify",false)
