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
  try {
    const username = req.context.user.username;
    const date = req.query?.date as string | undefined;

    if (!date) {
      return res.redirect(`/?date=${moment().format("YYYY-MM-DD")}`);
    }

    const weekStart = moment(date).startOf("week").add(1, "day").toDate();
    const weekEnd = moment(date).endOf("week").add(1, "day").toDate();

    const tasks = await prisma.task.findMany({
      where: { startDate: { gte: weekStart, lte: weekEnd } },
      orderBy: { startTime: "asc" },
    });

    render(res, Index({ tasks, username, date }));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
