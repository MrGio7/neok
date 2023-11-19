import { generateAccessToken, generateRefreshToken } from "@libs/jwt";
import { prisma } from "@libs/prisma";
import { renderError } from "@libs/react";
import { hashSync, compareSync } from "bcryptjs";
import { RequestHandler } from "express";
import { string as zString, object as zObject } from "zod";

export const login: RequestHandler = async (req, res) => {
  const body = zObject({
    username: zString().min(1),
    password: zString().min(1),
  }).safeParse(req.body);

  if (!body.success) {
    return renderError(res, body.error.message);
  }

  const {
    data: { password, username },
  } = body;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = compareSync(password, user.password);

  if (!isPasswordValid) {
    return renderError(res, "Invalid password");
  }

  const accessToken = generateAccessToken({ username });

  const refreshToken = generateRefreshToken({ username });

  return res
    .setHeader("authorization", `Bearer ${accessToken}`)
    .setHeader(
      "Set-Cookie",
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${
        7 * 24 * 60 * 60
      }; SameSite=Strict; Secure;`,
    )
    .setHeader("HX-Redirect", "/")
    .sendStatus(302);
};

export const register: RequestHandler = async (req, res) => {
  const { username, password, password2 } = zObject({
    username: zString().min(1),
    password: zString().min(1),
    password2: zString().min(1),
  }).parse(req.body);

  if (password !== password2) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = hashSync(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const accessToken = generateAccessToken({ username });

  const refreshToken = generateRefreshToken({ username });

  return res
    .setHeader("authorization", `Bearer ${accessToken}`)
    .setHeader(
      "Set-Cookie",
      `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${
        7 * 24 * 60 * 60
      }; SameSite=Strict; Secure;`,
    )
    .setHeader("HX-Redirect", "/")
    .sendStatus(302);
};

export const logout: RequestHandler = (_req, res) => {
  return res
    .clearCookie("refreshToken")
    .setHeader("HX-Redirect", "/auth/login")
    .sendStatus(302);
};
