import express from "express";
import cors from "cors";
import path from "path";
import * as url from "url";
import api from "./api/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
// const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://zmoi:seven7777777@donut.gnfo9so.mongodb.net/myDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

// Setup JSON parsing for request body
app.use(express.json());

// Enable CORS for all routes from any origin
app.use(cors());

// Setup our routes.
app.use("/", api);

// Make the "public" folder available statically
app.use(
  express.static(
    path.join(url.fileURLToPath(new URL(".", import.meta.url)), "public")
  )
);

app.listen(port, () => console.log(`App server listening on port ${port}!`));
