import express from "express";
import cors from "cors";
import path from "path";
import * as url from "url";
import api from "./api/index.js";
import fs from "fs";
import https from "https";

const file = fs.readFileSync("./7F7FDC8EC37461B3E058E41869794FAF.txt");

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

const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/zimo.digital/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/zimo.digital/fullchain.pem"),
};

app.get("/", (req, res) => res.json("my api running"));

app.get(
  "/.well-known/pki-validation/7F7FDC8EC37461B3E058E41869794FAF.txt",
  (req, res) =>
    res.sendFile(
      "/home/ubuntu/DONUT-code-comprehension-tool/backend/7F7FDC8EC37461B3E058E41869794FAF.txt"
    )
);

// Setup our routes.
app.use("/", api);

// Make the "public" folder available statically
app.use(
  express.static(
    path.join(url.fileURLToPath(new URL(".", import.meta.url)), "public")
  )
);

const server = https.createServer(options, app);

server.listen(port, () => console.log(`App server listening on port ${port}!`));
