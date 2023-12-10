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

export const update: RequestHandler = async (req, res) => {
  const body = z
    .object({
      id: z.string().transform((id) => BigInt(id)),
      name: z.string().optional(),
      description: z.string().optional(),
      start: z
        .string()
        .datetime()
        .optional()
        .transform((date) => date && new Date(date)),
      end: z
        .string()
        .datetime()
        .optional()
        .transform((date) => date && new Date(date)),
      done: z
        .string()
        .optional()
        .transform((done) => done === "true"),
      friend: z.string().optional(),
    })
    .parse(req.body);

  const user = req.context.user;

  const friendList =
    body.friend
      ?.split(",")
      .map((friend) => friend.trim())
      .filter((v) => !!v) || [];

  const task = await prisma.task.update({
    where: { id: body.id },
    data: {
      name: body.name,
      description: body.description,
      date: body.start,
      start: body.start,
      end: body.end,
      done: body.done,
      AttachedUsers: !!friendList.length
        ? {
            set: friendList.map((friend) => ({ username: friend })),
          }
        : undefined,
    },
  });

  res
    .setHeader("HX-Retarget", `#task-${task.id}`)
    .setHeader("HX-Reswap", "outerHTML")
    .setHeader("HX-Trigger", "closeTaskDetailDialog");

  render(res, Task({ task, user }));
};

export const info: RequestHandler = async (req, res) => {
  const { id } = z
    .object({
      id: z.string().transform((id) => BigInt(id)),
    })
    .parse(req.query);

  const user = req.context.user;

  const task = await prisma.task.findUniqueOrThrow({
    where: { id },
    include: { AttachedUsers: true },
  });

  res
    .setHeader("HX-Retarget", "#taskDetailDialog")
    .setHeader("HX-Reswap", "outerHTML")
    .setHeader("HX-Trigger", "showTaskDetailDialog");

  render(res, TaskDetailDialog({ task, user }));
};

export const remove: RequestHandler = async (req, res) => {
  const { id } = z
    .object({
      id: z.string().transform((id) => BigInt(id)),
    })
    .parse(req.body);

  await prisma.task.delete({ where: { id } });

  res
    .setHeader("HX-Retarget", `#task-${id}`)
    .setHeader("HX-Reswap", "outerHTML")
    .setHeader("HX-Trigger", "closeTaskDetailDialog");

  res.send("");
};
