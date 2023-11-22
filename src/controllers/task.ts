import Task from "@components/task";
import { render } from "@libs/react";
import { RequestHandler } from "express";
import z from "zod";
import { prisma } from "../libs/prisma";
import moment from "moment";

export const add: RequestHandler = async (req, res) => {
  try {
    const body = z
      .object({
        name: z.string().min(1).max(255),
        description: z.string().min(1).max(255).optional(),
        start: z.string().optional(),
        end: z.string().optional(),
        done: z.boolean().default(false),
      })
      .parse(req.body);

    const username = req.context.user.username;

    const task = await prisma.task.create({
      data: {
        name: body.name,
        description: body.description,
        startDate: !!body.start ? new Date(body.start) : undefined,
        startTime:
          !!body.start && new Date(body.start).getUTCHours() !== 0
            ? new Date(body.start)
            : undefined,
        endDate: !!body.end ? new Date(body.end) : undefined,
        endTime:
          !!body.end && new Date(body.end).getUTCHours() !== 0
            ? new Date(body.end)
            : undefined,
        done: body.done,
        creator: username,
      },
    });

    res
      .setHeader(
        "HX-Retarget",
        `#tasks_${moment(body.start).format("YYYY-MM-DD")}`,
      )
      .setHeader("HX-Reswap", "afterbegin")
      .setHeader("HX-Trigger", "closeAddTaskFormDialog");

    render(res, Task({ task }));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const toggle: RequestHandler = async (req, res) => {
  try {
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

    const currentTask = await prisma.task.findUniqueOrThrow({
      where: { creator_createdAt: { creator: username, createdAt } },
      select: { done: true },
    });

    const task = await prisma.task.update({
      where: { creator_createdAt: { creator: username, createdAt } },
      data: { done: !currentTask.done },
    });

    render(res, Task({ task }));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export const remove: RequestHandler = async (req, res) => {
  try {
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
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};
