import { Response } from "express";

export function redirectToLoginPage(res: Response) {
  return res.header("HX-Redirect", "/auth/login").sendStatus(302);
}
