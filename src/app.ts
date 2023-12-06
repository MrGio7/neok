import "dotenv/config";
import "express-async-errors";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler } from "express";

import router from "./routes";
import { render } from "@libs/react";
import Error from "@components/message";
import Message from "@components/message";

export type User = {
  username: string;
  timezone: string;
};

declare global {
  namespace Express {
    interface Request {
      context: { user: User };
    }
  }
}

export const app = express();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  res
    .setHeader("HX-Retarget", "#messages") //
    .setHeader("HX-Reswap", "beforeend");

  render(res, Message({ type: "error", message: err.message }));
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
