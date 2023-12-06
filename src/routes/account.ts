import { settings, update } from "@controllers/account";
import express from "express";

const accountRouter = express.Router();

accountRouter.get("/settings", settings);
accountRouter.post("/update", update);

export default accountRouter;
