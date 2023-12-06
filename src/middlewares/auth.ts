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
      const { username, timezone } = verifyAccessToken(accessToken);
      req.context = { user: { username, timezone } };
      res.header("authorization", `Bearer ${accessToken}`);
      return next();
    }

    if (!!refreshToken) {
      const { username, timezone } = verifyRefreshToken(refreshToken);
      const accessToken = generateAccessToken({ username, timezone });

      req.context = { user: { username, timezone } };
      res.header("authorization", `Bearer ${accessToken}`);
      return next();
    }

    return res
      .setHeader("HX-Redirect", "/auth/login")
      .setHeader("HX-Refresh", "true")
      .redirect("/auth/login");
  } catch (error) {
    console.error(error);
    return res
      .setHeader("HX-Redirect", "/auth/login")
      .setHeader("HX-Refresh", "true")
      .redirect("/auth/login");
  }
};

export default authMiddleware;
