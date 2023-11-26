import "dotenv/config";
import "express-async-errors";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler } from "express";

import router from "./routes";

declare global {
  namespace Express {
    interface Request {
      context: { user: { username: string } };
    }
  }
}

export const app = express();

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).send("internal server error");
};

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
