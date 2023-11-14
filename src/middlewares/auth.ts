import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "@libs/jwt";
import { RequestHandler } from "express";

const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization?.split(" ")[1];
    const refreshToken = req.cookies.refreshToken as string | undefined;

    if (!!accessToken) {
      const user = verifyAccessToken(accessToken);
      req.context = { user };
      res.header("authorization", `Bearer ${accessToken}`);
      return next();
    }

    if (!!refreshToken) {
      const user = verifyRefreshToken(refreshToken);
      const accessToken = generateAccessToken({ username: user.username });

      req.context = { user };
      res.header("authorization", `Bearer ${accessToken}`);
      return next();
    }

    return res.setHeader("HX-Redirect", "/auth/login").sendStatus(302);
  } catch (error) {
    console.error(error);
    return res.setHeader("HX-Redirect", "/auth/login").sendStatus(302);
  }
};

export default authMiddleware;
