import express from "express";
import { prisma } from "../libs/prisma";
import { taskRouter } from "./task";
import authRouter from "./auth";
import authMiddleware from "@middlewares/auth";
import { render } from "@libs/react";
import Index from "@pages/index";
import moment from "moment-timezone";
import { z } from "zod";
import SearchFriendSuggestions from "@components/searchFriend/searchFriendSuggestions";
import accountRouter from "./account";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/task", authMiddleware, taskRouter);
router.use("/account", authMiddleware, accountRouter);

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
        { AttachedUsers: { some: { username: user.username } } },
      ],
      date: { gte: weekStart, lte: weekEnd },
    },
    orderBy: [{ start: "asc" }, { createdAt: "asc" }],
  });

  render(res, Index({ tasks, user, selectedDate }));
});

router.post("/search-friend", authMiddleware, async (req, res) => {
  const { friend } = z
    .object({
      friend: z.string(),
    })
    .parse(req.body);

  const username = req.context.user.username;
  const friendList = friend.split(",").map((friend) => friend.trim());

  const search = friendList.at(-1);

  if (!search) {
    return render(res, SearchFriendSuggestions({ results: [] }));
  }

  const userList = await prisma.user.findMany({
    where: {
      username: {
        notIn: [username, ...friendList],
        contains: search,
        mode: "insensitive",
      },
    },
  });

  render(
    res,
    SearchFriendSuggestions({ results: userList.map((user) => user.username) }),
  );
});

export default router;
