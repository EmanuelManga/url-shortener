import express from "express";
import { apiGeneralController } from "../controller/apiGeneral.controller.js";
// Import controllers
export const apiGeneralRouter = express.Router();

// Define routes

apiGeneralRouter.get("/shorted/:id", apiGeneralController.urlShortenerGet);

apiGeneralRouter.post("/shorted", apiGeneralController.urlShortenerPost);
