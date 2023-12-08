import { generateAccessToken, generateRefreshToken } from "@libs/jwt";
import { prisma } from "@libs/prisma";
import { compareSync, hashSync } from "bcryptjs";
import { RequestHandler } from "express";
import z from "zod";

export const login: RequestHandler = async (req, res) => {
  const { password, username } = z
    .object({
      username: z.string().min(1),
      password: z.string().min(1),
    })
    .parse(req.body);

  const user = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = compareSync(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const accessToken = generateAccessToken({
    username,
    timezone: user.timezone,
  });

  const refreshToken = generateRefreshToken({
    username,
    timezone: user.timezone,
  });

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
  const { username, password, password2, timezone } = z
    .object({
      username: z.string().min(1),
      password: z.string().min(1),
      password2: z.string().min(1),
      timezone: z.string().min(1),
    })
    .parse(req.body);

  if (password !== password2) {
    throw new Error("Passwords do not match");
  }

  const user = await prisma.user.findFirst({
    where: { username: { equals: username, mode: "insensitive" } },
  });

  if (user) {
    throw new Error("User already exists");
  }

  const hashedPassword = hashSync(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
      timezone,
    },
  });

  const accessToken = generateAccessToken({ username, timezone });

  const refreshToken = generateRefreshToken({ username, timezone });

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
