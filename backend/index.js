import express from "express";
import cors from "cors";
import path from "path";
import * as url from "url";
import api from "./api/index.js";
import fs from "fs";
import https from "https";

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

const certificate = fs.readFileSync("/home/ubuntu/certificate.crt", "utf8");
const privateKey = fs.readFileSync("/home/ubuntu/private.key", "utf8");

const options = {
  key: privateKey,
  cert: certificate,
};

app.get(
  "/.well-known/pki-validation/EFD63B5C88AED79D5FA71EAB14E3CFB2.txt",
  function (req, res) {
    res.sendFile("/home/ubuntu/EFD63B5C88AED79D5FA71EAB14E3CFB2.txt");
  }
);

app.get("/", (req, res) => res.json("my api running"));

// Setup our routes.
app.use("/", api);

// Make the "public" folder available statically
app.use(
  express.static(
    path.join(url.fileURLToPath(new URL(".", import.meta.url)), "public")
  )
);

// app.listen(port, () => console.log(`App server listening on port ${port}!`));

const server = https.createServer(options, app);

server.listen(port, () => console.log(`App server listening on port ${443}!`));
