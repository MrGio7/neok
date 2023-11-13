import { redirectToLoginPage } from "@libs/express";
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

    return redirectToLoginPage(res);
  } catch (error) {
    console.error(error);
    return redirectToLoginPage(res);
  }
};

export default authMiddleware;
