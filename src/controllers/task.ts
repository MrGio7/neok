import { RequestHandler, Response } from "express";
import z from "zod";
import { prisma } from "../libs/prisma";
import { render } from "@libs/react";
import Task from "@components/task";

export const add: RequestHandler = async (req, res) => {
  const body = z
    .object({
      name: z.string().min(1).max(255),
      description: z.string().min(1).max(255).optional(),
      start: z.date().optional(),
      end: z.date().optional(),
      done: z.boolean().default(false),
    })
    .parse(req.body);

  const username = req.context.user.username;

  const task = await prisma.task.create({
    data: {
      ...body,
      username,
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
    where: { username_createdAt: { username, createdAt } },
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
      username_createdAt: { username, createdAt },
    },
  });

  res.send("");
};
