import Task from "@components/task";
import { render } from "@libs/react";
import { RequestHandler } from "express";
import z from "zod";
import { prisma } from "../libs/prisma";

export const add: RequestHandler = async (req, res) => {
  const body = z
    .object({
      name: z.string().min(1).max(255),
      description: z.string().min(1).max(255).optional(),
      startDate: z.string().optional(),
      endDate: z.string().optional(),
      done: z.boolean().default(false),
    })
    .parse(req.body);

  const username = req.context.user.username;

  const task = await prisma.task.create({
    data: {
      name: body.name,
      description: body.description,
      start: !!body.startDate ? new Date(body.startDate) : undefined,
      end: !!body.endDate ? new Date(body.endDate) : undefined,
      done: body.done,
      creator: username,
    },
  });

  res
    .setHeader("HX-Retarget", `#tasks_${body.startDate}`)
    .setHeader("HX-Reswap", "afterbegin");

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
