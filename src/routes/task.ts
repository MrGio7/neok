import express from "express";
import { add, info, remove, toggle, update } from "@controllers/task";

const taskRouter = express.Router();

taskRouter.post("/add", add);
taskRouter.put("/toggle", toggle);
taskRouter.delete("/remove", remove);
taskRouter.get("/info", info);
taskRouter.put("/update", update);

export { taskRouter };
