import { Router } from "express";
import {
  addCompetitor,
  getCompetitors,
  getCompetitorbyCategory,
  getCompetitorsbyEvent,
  getCompetitorbyTeam,
} from "../controllers/competitorController";
import validateToken from "./validate-token";

const router = Router();

/**
 * @swagger
 * /api/competitors:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    summary: Registra un nuevo competidor
 *    tags: [Competitors]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Competitor'
 *    responses:
 *      201:
 *        description: Se ha registrado el competidor
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Competitor'
 *      400:
 *        description: Error al registrar el competidor
 */
router.post("/", validateToken, addCompetitor);

/**
 * @swagger
 * /api/competitors:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Obtiene todos los competidores
 *    tags: [Competitors]
 *    responses:
 *      200:
 *        description: Lista de competidores
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Competitor'
 *      400:
 *        description: Error al obtener los competidores
 */
router.get("/", validateToken, getCompetitors);

/**
 * @swagger
 * /api/competitors/category/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Obtiene todos los competidores por categoria
 *    tags: [Competitors]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id de la categoria
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Lista de competidores
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Competitor'
 *      400:
 *        description: Error al obtener los competidores
 */
router.get("/category/:id", validateToken, getCompetitorbyCategory);

/**
 * @swagger
 * /api/competitors/event/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Obtiene todos los competidores por evento
 *    tags: [Competitors]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id del evento
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Lista de competidores
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Competitor'
 *      400:
 *        description: Error al obtener los competidores
 */
router.get("/event/:id", validateToken, getCompetitorsbyEvent);

/**
 * @swagger
 * /api/competitors/team/{id}:
 *  get:
 *    security:
 *      - bearerAuth: []
 *    summary: Obtiene todos los competidores por equipo
 *    tags: [Competitors]
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Id del equipo
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Lista de competidores
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Competitor'
 *      400:
 *        description: Error al obtener los competidores
 */
router.get("/team/:id", validateToken, getCompetitorbyTeam);

export default router;
