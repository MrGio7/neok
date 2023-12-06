import { login, logout, register } from "@controllers/auth";
import { render } from "@libs/react";
import Login from "@pages/auth/login";
import Register from "@pages/auth/register";
import express from "express";

const authRouter = express.Router();

authRouter.get("/login", (_req, res) => render(res, Login({})));
authRouter.post("/login", login);

authRouter.get("/register", (_req, res) => render(res, Register({})));
authRouter.post("/register", register);

authRouter.get("/logout", logout);

export default authRouter;
