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
    const timezone =
      (req.cookies.timezone as string | undefined) || "Asia/Tbilisi";

    if (!!accessToken) {
      const { username } = verifyAccessToken(accessToken);
      req.context = { user: { username, timezone } };
      res.header("authorization", `Bearer ${accessToken}`);
      return next();
    }

    if (!!refreshToken) {
      const { username } = verifyRefreshToken(refreshToken);
      const accessToken = generateAccessToken({ username });

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
