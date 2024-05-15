import { Router } from "express";
import {
  addCheckPoint,
  getCheckPoints,
  getCheckPointByEvent,
  getCheckPointByUser,
} from "../controllers/checkPointController";
import validateToken from "./validate-token";

const router = Router();

/**
 * @swagger
 * /api/checkpoints:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Registra un nuevo punto de control
 *    tags: [CheckPoints]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/CheckPoint'
 *    responses:
 *      201:
 *        description: Se ha registrado el punto de control
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CheckPoint'
 *      400:
 *        description: Error al registrar el punto de control
 */
router.post("/", validateToken, addCheckPoint);

/**
 * @swagger
 * /api/checkpoints:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Obtiene todos los puntos de control
 *    tags: [CheckPoints]
 *    responses:
 *      200:
 *        description: Lista de puntos de control
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CheckPoint'
 *      400:
 *        description: Error al obtener los puntos de control
 */
router.get("/", validateToken, getCheckPoints);

/**
 * @swagger
 * /api/checkpoints/event/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Obtiene los puntos de control de un evento
 *    tags: [CheckPoints]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del evento
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Lista de puntos de control
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CheckPoint'
 *      400:
 *        description: Error al obtener los puntos de control
 */
router.get("/event/:id", validateToken, getCheckPointByEvent);

/**
 * @swagger
 * /api/checkpoints/user/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Obtiene los puntos de control de un usuario
 *    tags: [CheckPoints]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del usuario
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Lista de puntos de control
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CheckPoint'
 *      400:
 *        description: Error al obtener los puntos de control
 */
router.get("/user/:id", validateToken, getCheckPointByUser);

export default router;
