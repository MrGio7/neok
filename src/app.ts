import "dotenv/config";

import bodyParser from "body-parser";
import env from "@env";
import express from "express";
import cookieParser from "cookie-parser";

import router from "./routes";

export const app = express();

declare global {
  namespace Express {
    interface Request {
      context: { user: { username: string } };
    }
  }
}

app.use(express.static("src/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

app.listen(env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`),
);
