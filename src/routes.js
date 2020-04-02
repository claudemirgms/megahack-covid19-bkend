import { Router } from "express";

import SessionController from "./app/controllers/SessionController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/session", SessionController.store);

// Authentication
routes.use(authMiddleware);

export default routes;
