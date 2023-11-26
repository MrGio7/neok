import express from "express";
import { prisma } from "../libs/prisma";
import { taskRouter } from "./task";
import authRouter from "./auth";
import authMiddleware from "@middlewares/auth";
import { render } from "@libs/react";
import Index from "@pages/index";
import moment from "moment";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/task", authMiddleware, taskRouter);

router.get("/", authMiddleware, async (req, res) => {
  const username = req.context.user.username;
  const date = req.query?.date as string | undefined;

  if (!date) {
    return res.redirect(
      `/?date=${moment().tz("Asia/Tbilisi").format("YYYY-MM-DD")}`,
    );
  }

  const weekStart = moment(date)
    .tz("Asia/Tbilisi")
    .startOf("week")
    .add(1, "day")
    .toDate();
  const weekEnd = moment(date)
    .tz("Asia/Tbilisi")
    .endOf("week")
    .add(1, "day")
    .toDate();

  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        { creator: username },
        { AttachedUsers: { some: { userUsername: username } } },
      ],
      startDate: { gte: weekStart, lte: weekEnd },
    },
    orderBy: [{ startTime: "asc" }, { createdAt: "asc" }],
  });

  render(res, Index({ tasks, username, date }));
});

export default router;
