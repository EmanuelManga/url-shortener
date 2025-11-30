import { errorResponse, successResponse } from "../utils/responses.js";

class ApiGeneralController {
    async urlShortenerGet(req, res) {
        try {
            const { id } = req.params;
            successResponse(res, 200, { id }, "Bienvenido a la API del acortador de URLs");
        } catch (error) {
            errorResponse(res, 404, error.message || "Error al procesar la solicitud");
        }
    }

    async urlShortenerPost(req, res) {
        try {
            const { url } = req.body;

            const newUrl = "http://short.url/abcd1234"; // Aquí iría la lógica para generar la URL corta

            successResponse(res, 200, { url: url, newUrl: newUrl }, "Bienvenido a la API del acortador de URLs");
        } catch (error) {
            errorResponse(res, 404, error.message || "Error al procesar la solicitud");
        }
    }
}

export const apiGeneralController = new ApiGeneralController();
