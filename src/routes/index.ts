import express from "express";
import { prisma } from "../libs/prisma";
import { taskRouter } from "./task";
import authRouter from "./auth";
import authMiddleware from "@middlewares/auth";
import { render } from "@libs/react";
import Index from "@pages/index";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/task", authMiddleware, taskRouter);

router.get("/", authMiddleware, async (req, res) => {
  try {
    const username = req.context.user.username;
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: "desc" },
    });

    render(res, Index({ tasks, username }));
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

export default router;
