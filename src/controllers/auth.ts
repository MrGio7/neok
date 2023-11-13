import { generateAccessToken, generateRefreshToken } from "@libs/jwt";
import { prisma } from "@libs/prisma";
import bcrypt from "bcrypt";
import { RequestHandler } from "express";
import z from "zod";

export const login: RequestHandler = async (req, res) => {
  const { username, password } = z
    .object({
      username: z.string().min(1),
      password: z.string().min(1),
    })
    .parse(req.body);

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const accessToken = generateAccessToken({ username });

  const refreshToken = generateRefreshToken({ username });

  res.setHeader("authorization", `Bearer ${accessToken}`);
  res.setHeader(
    "Set-Cookie",
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${
      7 * 24 * 60 * 60
    }; SameSite=Strict; Secure;`,
  );
  res.setHeader("HX-Redirect", "/").sendStatus(302);
};

export const register: RequestHandler = async (req, res) => {
  const { username, password, password2 } = z
    .object({
      username: z.string().min(1),
      password: z.string().min(1),
      password2: z.string().min(1),
    })
    .parse(req.body);

  if (password !== password2) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  const accessToken = generateAccessToken({ username });

  const refreshToken = generateRefreshToken({ username });

  res.header("authorization", `Bearer ${accessToken}`);
  res.header(
    "Set-Cookie",
    `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${
      7 * 24 * 60 * 60
    }; SameSite=Strict; Secure;`,
  );
  res.header("HX-Redirect", "/").sendStatus(302);
};
