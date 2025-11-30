import compression from "compression";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import path from "path";

import { apiGeneralRouter } from "./router/apiGeneral.router.js";
import { errorResponder, errorResponse, successResponse } from "./utils/responses.js";
import { __dirname } from "./utils/utils.js";

dotenv.config();

// console.log("process.env.DEBBUGING", process.env.DEBBUGING);

export const VARIABLES_ENTORNO = {
    PORT: process.env.PORT || 3000,
    SESSION_SECRET: process.env.SESSION_SECRET,
    DEBBUGING: Boolean(Number(process.env.DEBBUGING)) || false,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: Number(process.env.DB_PORT) || 3306,
};
Object.freeze(VARIABLES_ENTORNO);
// console.log("Variables de entorno:", VARIABLES_ENTORNO);

const app = express();
const port = VARIABLES_ENTORNO.PORT;
app.use(express.json());

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// app.engine("handlebars", handlebars.engine());
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "handlebars");

// app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: VARIABLES_ENTORNO.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: !VARIABLES_ENTORNO.DEBBUGING,
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        },
    })
);

app.use("/public", express.static(path.join(__dirname, "public")));
// app.use("/vendor", express.static(path.join(__dirname, "../node_modules")));

// API
app.get("/", (req, res) => {
    successResponse(res, 200, { message: "API de acortador de URLs funcionando correctamente" }, "Bienvenido a la API del acortador de URLs");
});

app.use("/api", apiGeneralRouter);

app.get("/*splat", async (req, res) => {
    errorResponse(res, 404, "URL no encontrada");
});

app.use(errorResponder);
