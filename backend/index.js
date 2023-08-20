import express from "express";
import cors from "cors";
import path from "path";
import * as url from "url";
import api from "./api/index.js";
import fs from "fs";

const file = fs.readFileSync("./3B23769B34E8061EC03A20EFC7240715.txt");

const app = express();
const port = process.env.PORT || 3000;

// Setup JSON parsing for request body
app.use(express.json());

// Enable CORS for all routes from any origin
app.use(cors());
// app.use(
//   cors({
//     origin: "https://an-odd-zmoi.github.io",
//   })
// );
app.get("/", (req, res) => res.json("my api running"));

app.get(
  "/.well-known/pki-validation/3B23769B34E8061EC03A20EFC7240715.txt",
  (req, res) => res.send(file.toString("utf8"))
);

// Setup our routes.
app.use("/", api);

// Make the "public" folder available statically
app.use(
  express.static(
    path.join(url.fileURLToPath(new URL(".", import.meta.url)), "public")
  )
);

app.listen(port, () => console.log(`App server listening on port ${port}!`));
