import Task from "@components/task";
import TaskDetailDialog from "@components/taskDetailDialog";
import { render } from "@libs/react";
import { RequestHandler } from "express";
import moment from "moment";
import z from "zod";
import { prisma } from "../libs/prisma";

export const add: RequestHandler = async (req, res) => {
  const body = z
    .object({
      name: z.string().min(1).max(255),
      start: z.string().datetime(),
    })
    .parse(req.body);

  const user = req.context.user;

  const task = await prisma.task.create({
    data: {
      name: body.name,
      date: new Date(body.start),
      creator: user.username,
    },
  });

  res
    .setHeader(
      "HX-Retarget",
      `#tasks_${moment(body.start).tz(user.timezone).format("YYYY-MM-DD")}`,
    )
    .setHeader("HX-Reswap", "beforeend");

  render(res, Task({ task, user }));
};

export const toggle: RequestHandler = async (req, res) => {
  const body = z
    .object({
      createdAt: z.string(),
    })
    .parse(req.body);

  const user = req.context.user;
  const { username, timezone } = user;
  const createdAt = new Date(+body.createdAt);

  if (!createdAt) {
    return res.status(400).send("Invalid date");
  }

  const currentTask = await prisma.task.findUniqueOrThrow({
    where: { creator_createdAt: { creator: username, createdAt } },
    select: { done: true },
  });

  const task = await prisma.task.update({
    where: { creator_createdAt: { creator: username, createdAt } },
    data: { done: !currentTask.done },
  });

  render(res, Task({ task, user }));
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

export const info: RequestHandler = async (req, res) => {
  const query = z
    .object({
      createdAt: z.string(),
    })
    .parse(req.query);

  const user = req.context.user;
  const createdAt = new Date(+query.createdAt);

  if (!createdAt) {
    return res.status(400).send("Invalid date");
  }

  const task = await prisma.task.findUniqueOrThrow({
    where: { creator_createdAt: { creator: user.username, createdAt } },
  });

  res
    .setHeader("HX-Retarget", "#taskDetailDialog")
    .setHeader("HX-Reswap", "outerHTML")
    .setHeader("HX-Trigger", "showTaskDetailDialog");

  render(res, TaskDetailDialog({ task, user }));
};

export const update: RequestHandler = async (req, res) => {
  const body = z
    .object({
      name: z.string(),
      description: z.string().optional(),
      start: z.string().datetime().optional(),
      end: z.string().datetime().optional(),
      done: z.boolean().default(false),
      createdAt: z.string(),
    })
    .parse(req.body);

  const user = req.context.user;

  const task = await prisma.task.update({
    where: {
      creator_createdAt: {
        creator: user.username,
        createdAt: new Date(+body.createdAt),
      },
    },
    data: {
      name: body.name,
      description: body.description,
      date: !!body.start ? new Date(body.start) : undefined,
      start: !!body.start ? new Date(body.start) : undefined,
      end: !!body.end ? new Date(body.end) : undefined,
      done: body.done,
    },
  });

  res
    .setHeader("HX-Retarget", `#task-${body.createdAt}`)
    .setHeader("HX-Reswap", "outerHTML")
    .setHeader("HX-Trigger", "closeTaskDetailDialog");

  render(res, Task({ task, user }));
};
