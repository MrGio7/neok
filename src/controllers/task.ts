import Task from "@components/task";
import { render } from "@libs/react";
import { RequestHandler } from "express";
import z from "zod";
import { prisma } from "../libs/prisma";

export const add: RequestHandler = async (req, res) => {
  console.log(req.body);

  const body = z
    .object({
      name: z.string().min(1).max(255),
      description: z.string().min(1).max(255).optional(),
      start: z.string().datetime().optional(),
      end: z.string().datetime().optional(),
      done: z.boolean().default(false),
    })
    .parse(req.body);

  const username = req.context.user.username;

  const task = await prisma.task.create({
    data: {
      ...body,
      creator: username,
    },
  });

  render(res, Task({ task }));
};

export const toggle: RequestHandler = async (req, res) => {
  const body = z
    .object({
      createdAt: z.string(),
    })
    .parse(req.body);

  const username = req.context.user.username;
  const createdAt = new Date(+body.createdAt);

  if (!createdAt) {
    return res.status(400).send("Invalid date");
  }

  const task = await prisma.task.update({
    where: { creator_createdAt: { creator: username, createdAt } },
    data: { done: true },
  });

  render(res, Task({ task }));
};

export const remove: RequestHandler = async (req, res) => {
  const body = z
    .object({
      createdAt: z.string(),
    })
    .parse(req.body);

  const username = req.context.user.username;
  const createdAt = new Date(+body.createdAt);

  if (!createdAt) {
    return res.status(400).send("Invalid date");
  }

  await prisma.task.delete({
    where: {
      creator_createdAt: { creator: username, createdAt },
    },
  });

  res.send("");
};
