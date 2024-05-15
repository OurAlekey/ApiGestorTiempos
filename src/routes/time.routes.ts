import { Router } from "express";
import {
  getTimes,
  addTime,
  getTimeByCheckPoint,
  getTimeByCompetitor,
} from "../controllers/timeController";
import validateToken from "./validate-token";

const router = Router();

/**
 * @swagger
 * /api/times:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna todos los tiempos registrados
 *    tags: [Times]
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de tiempos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Time'
 *      404:
 *        description: No se encontraron tiempos registrados
 */
router.get("/", validateToken, getTimes);

/**
 * @swagger
 * /api/times:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Registra un nuevo tiempo
 *    tags: [Times]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Time'
 *    responses:
 *      201:
 *        description: Se ha registrado el tiempo
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Time'
 *      400:
 *        description: Error al registrar el tiempo
 */
router.post("/", validateToken, addTime);

/**
 * @swagger
 * /api/times/check-point/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna los tiempos registrados en un punto de control
 *    tags: [Times]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del punto de control
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de tiempos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Time'
 *      404:
 *        description: No se encontraron tiempos registrados
 */
router.get("/check-point/:id", validateToken, getTimeByCheckPoint);

/**
 * @swagger
 * /api/times/competitor/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Retorna los tiempos registrados de un participante
 *    tags: [Times]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID del participante
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Se ha obtenido el registro de tiempos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Time'
 *      404:
 *        description: No se encontraron tiempos registrados
 */
router.get("/competitor/:id", validateToken, getTimeByCompetitor);

export default router;
