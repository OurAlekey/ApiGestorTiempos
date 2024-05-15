import { Router } from "express";
import { addEvent, getEvents, getEventByCategory } from "../controllers/eventController";
import validateToken from "./validate-token";

const router = Router();

/**
 * @swagger
 * /api/events:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Registra un nuevo evento
 *    tags: [Events]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Event'
 *    responses:
 *      201:
 *        description: Se ha registrado el evento
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Event'
 *      400:
 *        description: Error al registrar el evento
 */
router.post("/", validateToken, addEvent);

/**
 * @swagger
 * /api/events:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Obtiene todos los eventos
 *    tags: [Events]
 *    responses:
 *      200:
 *        description: Lista de eventos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Event'
 *      400:
 *        description: Error al obtener los eventos
 */
router.get("/", validateToken, getEvents);

/**
 * @swagger
 * /api/events/category/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Obtiene los eventos por categoria
 *    tags: [Events]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id de la categoria
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Lista de eventos por categoria
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Event'
 *      400:
 *        description: Error al obtener los eventos
 */
router.get("/category/:id", validateToken, getEventByCategory);

export default router;
