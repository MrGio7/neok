import Message from "@components/message";
import { prisma } from "@libs/prisma";
import { render } from "@libs/react";
import AccountSettings from "@pages/account/accountSettings";
import { hashSync } from "bcryptjs";
import { RequestHandler } from "express";
import { z } from "zod";

export const settings: RequestHandler = async (req, res) => {
  const user = req.context.user;

  render(res, AccountSettings({ user }));
};

export const update: RequestHandler = async (req, res) => {
  const body = z
    .object({
      timezone: z.string(),
      password: z.string().optional(),
      password2: z.string().optional(),
    })
    .parse(req.body);

  const user = req.context.user;

  if (body.password !== body.password2) {
    throw new Error("Passwords do not match");
  }

  const hashedPassword = !!body.password && hashSync(body.password, 10);

  await prisma.user.update({
    where: { username: user.username },
    data: {
      timezone: !!body.timezone ? body.timezone : undefined,
      password: !!hashedPassword ? hashedPassword : undefined,
    },
  });

  res
    .setHeader("HX-Retarget", "#messages") //
    .setHeader("HX-Reswap", "beforeend");

  render(res, Message({ type: "success", message: "Account updated" }));
};
