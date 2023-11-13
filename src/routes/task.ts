import express from "express";
import { add, remove, toggle } from "@controllers/task";

const taskRouter = express.Router();

taskRouter.post("/add", add);
taskRouter.put("/toggle", toggle);
taskRouter.delete("/remove", remove);

export { taskRouter };
