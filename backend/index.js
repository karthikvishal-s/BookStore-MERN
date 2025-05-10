import express from "express";
import {PORT,mongoDBURL} from "./config.js"  // Importing the PORT constant from config.js
import mongoose from "mongoose"; // Importing mongoose for MongoDB object modeling

const app=express();

app.get('/',(req,res)=>{  //Creating a route for the root URL
   console.log(req); //Logging the request object to the console
   return res.status(234).send("Hello World"); //Sending a response with status code 234 and the message "Hello World"
});




mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT,()=>{   //.listen() method is used in express to bind and listen for connections on the specified host and port
            console.log(`Server is running on port ${PORT}`); //Callback function
        });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB:");
    });