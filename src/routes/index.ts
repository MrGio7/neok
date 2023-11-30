import express from "express";
import { prisma } from "../libs/prisma";
import { taskRouter } from "./task";
import authRouter from "./auth";
import authMiddleware from "@middlewares/auth";
import { render } from "@libs/react";
import Index from "@pages/index";
import moment from "moment-timezone";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/task", authMiddleware, taskRouter);

router.get("/", authMiddleware, async (req, res) => {
  const user = req.context.user;
  const date = req.query?.date as string | undefined;

  if (!date) {
    return res.redirect(
      `/?date=${moment().tz(user.timezone).format("YYYY-MM-DD")}`,
    );
  }

  const selectedDate = moment.tz(date, user.timezone).toDate();

  const weekStart = moment
    .tz(date, user.timezone)
    .startOf("week")
    .add(1, "day")
    .toDate();

  const weekEnd = moment
    .tz(date, user.timezone)
    .endOf("week")
    .add(1, "day")
    .toDate();

  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        { creator: user.username },
        { AttachedUsers: { some: { userUsername: user.username } } },
      ],
      date: { gte: weekStart, lte: weekEnd },
    },
    orderBy: [{ start: "asc" }, { createdAt: "asc" }],
  });

  render(res, Index({ tasks, user, selectedDate }));
});

export default router;
