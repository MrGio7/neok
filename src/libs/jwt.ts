import env from "@env";
import jwt from "jsonwebtoken";

export type Payload = { username: string; timezone: string };

export function generateAccessToken(payload: Payload) {
  return jwt.sign(
    payload, //
    env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" },
  );
}

export function generateRefreshToken(payload: Payload) {
  return jwt.sign(
    payload, //
    env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" },
  );
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, env.ACCESS_TOKEN_SECRET) as Payload;
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, env.REFRESH_TOKEN_SECRET) as Payload;
}
