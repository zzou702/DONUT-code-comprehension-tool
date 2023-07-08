import express from "express";
import cors from "cors";
import path from "path";
import * as url from "url";
import api from "./api/index.js";

const app = express();
const port = process.env.PORT || 3000;

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
