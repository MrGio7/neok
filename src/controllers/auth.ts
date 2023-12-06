import { generateAccessToken, generateRefreshToken } from "@libs/jwt";
import { prisma } from "@libs/prisma";
import { compareSync, hashSync } from "bcryptjs";
import { RequestHandler } from "express";
import { object as zObject, string as zString } from "zod";

export const login: RequestHandler = async (req, res) => {
  const { password, username } = zObject({
    username: zString().min(1),
    password: zString().min(1),
  }).parse(req.body);

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
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
    throw new Error("Passwords do not match");
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    throw new Error("User already exists");
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
